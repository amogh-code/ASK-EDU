import pygame
import random
import time
import json

# Initialize Pygame
pygame.init()

# Game settings
WIDTH, HEIGHT = 800, 600
GRID_SIZE = 4
CARD_SIZE = 100
CARD_SPACING = 10
CARD_BACK_COLOR = (150, 150, 150)
FONT_SIZE = 24
HIGH_SCORES_FILE = "high_scores.json"

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
GREEN = (0, 255, 0)
RED = (255, 0, 0)

# Create a list of card colors (duplicate for pairs)
card_colors = [
    (255, 0, 0),  # Red
    (0, 0, 255),  # Blue
    (0, 255, 0),  # Green
    (255, 255, 0),  # Yellow
    (128, 0, 128),  # Purple
    (255, 165, 0),  # Orange
    (255, 192, 203),  # Pink
    (0, 128, 0)   # Dark Green
] * 2
random.shuffle(card_colors)

# Create a 2D grid to store card states
grid = [[False for _ in range(GRID_SIZE)] for _ in range(GRID_SIZE)]

# Function to draw the game board
def draw_board():
    screen.fill(WHITE)  # Fill the screen with white

    for row in range(GRID_SIZE):
        for col in range(GRID_SIZE):
            x = col * (CARD_SIZE + CARD_SPACING) + 50
            y = row * (CARD_SIZE + CARD_SPACING) + 50
            pygame.draw.rect(screen, CARD_BACK_COLOR, (x, y, CARD_SIZE, CARD_SIZE))

# Function to draw cards
def draw_cards():
    for row in range(GRID_SIZE):
        for col in range(GRID_SIZE):
            x = col * (CARD_SIZE + CARD_SPACING) + 50
            y = row * (CARD_SIZE + CARD_SPACING) + 50
            if grid[row][col]:
                pygame.draw.rect(screen, card_colors[row * GRID_SIZE + col], (x, y, CARD_SIZE, CARD_SIZE))

# Function to handle mouse clicks
def handle_click():
    global first_click, second_click, clicks, start_time
    mouse_pos = pygame.mouse.get_pos()
    row = mouse_pos[1] // (CARD_SIZE + CARD_SPACING)
    col = mouse_pos[0] // (CARD_SIZE + CARD_SPACING)

    if not grid[row][col]:
        clicks += 1
        if not first_click:
            first_click = (row, col)
        elif second_click is None:
            second_click = (row, col)

# Function to check for a match
def check_match():
    global first_click, second_click, matches, start_time
    if first_click and second_click:
        row1, col1 = first_click
        row2, col2 = second_click

        if (row1, col1) != (row2, col2) and \
           card_colors[row1 * GRID_SIZE + col1] == card_colors[row2 * GRID_SIZE + col2]:
            matches += 1
            first_click = None
            second_click = None

# Function to check for game over
def check_game_over():
    global game_over
    if matches == GRID_SIZE * GRID_SIZE // 2:
        game_over = True

# Function to calculate and display game time
def calculate_game_time():
    global start_time, game_time
    if start_time:
        game_time = int(time.time() - start_time)

# Function to display game information
def display_game_info():
    font = pygame.font.Font(None, FONT_SIZE)
    moves_text = f"Moves: {clicks}"
    time_text = f"Time: {game_time} seconds"
    moves_surface = font.render(moves_text, True, BLACK)
    time_surface = font.render(time_text, True, BLACK)
    screen.blit(moves_surface, (20, 20))
    screen.blit(time_surface, (WIDTH - 150, 20))

# Function to display game over message
def display_game_over_message():
    font = pygame.font.Font(None, FONT_SIZE * 2)
    game_over_text = "You Win!"
    game_over_surface = font.render(game_over_text, True, GREEN)
    text_rect = game_over_surface.get_rect(center=(WIDTH // 2, HEIGHT // 2))
    screen.blit(game_over_surface, text_rect)

# Function to save high score
def save_high_score():
    try:
        with open(HIGH_SCORES_FILE, 'r') as f:
            high_scores = json.load(f)
    except FileNotFoundError:
        high_scores = []

    high_scores.append({"moves": clicks, "time": game_time})
    high_scores.sort(key=lambda x: (x['moves'], x['time'])) 
    high_scores = high_scores[:5] 

    with open(HIGH_SCORES_FILE, 'w') as f:
        json.dump(high_scores, f, indent=4)

# Function to load and display high scores
def load_and_display_high_scores():
    try:
        with open(HIGH_SCORES_FILE, 'r') as f:
            high_scores = json.load(f)
    except FileNotFoundError:
        high_scores = []

    font = pygame.font.Font(None, FONT_SIZE)
    y_offset = 100
    for i, score in enumerate(high_scores):
        score_text = f"{i+1}. Moves: {score['moves']} Time: {score['time']}s"
        score_surface = font.render(score_text, True, BLACK)
        screen.blit(score_surface, (20, y_offset))
        y_offset += 30

# Initialize game variables
first_click = None
second_click = None
clicks = 0
matches = 0
game_over = False
start_time = None
game_time = 0

# Game loop
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Memory Game")
running = True
clock = pygame.time.Clock()

while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        elif event.type == pygame.MOUSEBUTTONDOWN:
            if not game_over:
                handle_click()
                if not start_time:
                    start_time = time.time()

    draw_board()
    draw_cards()
    display_game_info()

    if game_over:
        display_game_over_message()
        save_high_score()
        load_and_display_high_scores() 

    check_match()
    check_game_over()
    calculate_game_time()

    pygame.display.flip()
    clock.tick(60)

pygame.quit()
