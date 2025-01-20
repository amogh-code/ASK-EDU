const socket = io(); // Connect to the server

// Get DOM elements
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const chatMessages = document.getElementById('chat-messages');
const channelLinks = document.querySelectorAll('.channel-list a');

// Current channel (initialize with a default channel)
let currentChannel = 'general'; 

// Handle channel selection
channelLinks.forEach(link => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const newChannel = link.getAttribute('data-channel');

    // Remove active class from all links
    channelLinks.forEach(link => link.classList.remove('active'));

    // Add active class to the clicked link
    link.classList.add('active');

    // Join the new channel
    socket.emit('join_channel', newChannel); 

    // Update current channel
    currentChannel = newChannel;

    // Clear existing messages
    chatMessages.innerHTML = ''; 
  });
});

// Handle message submission
sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message !== '') {
    socket.emit('send_message', { 
      message: message, 
      channel: currentChannel 
    });
    messageInput.value = ''; 
  }
});

// Handle incoming messages
socket.on('new_message', (data) => {
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message');

  if (data.user === 'you') { 
    messageElement.classList.add('user-message'); 
  }

  const usernameElement = document.createElement('span');
  usernameElement.classList.add('username');
  usernameElement.textContent = `${data.username}: `;

  const messageContentElement = document.createElement('span');
  messageContentElement.classList.add('message-content');
  messageContentElement.textContent = data.message;

  messageElement.appendChild(usernameElement);
  messageElement.appendChild(messageContentElement);

  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight; 
});

// Handle channel join/leave events (optional)
socket.on('join_channel_success', (channel) => {
  console.log(`Joined channel: ${channel}`);
  // Optionally display a notification to the user
});

socket.on('leave_channel', (channel) => {
  console.log(`Left channel: ${channel}`);
  // Clear chat messages on channel leave
  chatMessages.innerHTML = ''; 
});
