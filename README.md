## ASYNC RACE

# [Live Demo](https://async-race-gamma.vercel.app/)

## Calculated Score: X/375 pts

## Checklist

### Basic Structure (80 points)

- [x] **Two Views (10 points)**: Implement two primary views: "Garage" and "Winners".

- [x] **Garage View Content (30 points)**: The "Garage" view must display:

  - [x] Name of the view ("Garage").
  - [x] Car creation and editing panel.
  - [x] Race control panel.
  - [x] Garage section.

- [x] **Winners View Content (10 points)**: The "Winners" view should display:

  - [x] Name of the view ("Winners").
  - [x] Winners table.
  - [x] Pagination.

- [x] **Persistent State (30 points)**: Ensure the view state remains consistent when navigating between views (preserving page numbers, input states, etc.).

---

### Garage View (90 points)

- [x] **Car Creation And Editing Panel (CRUD Operations) (20 points)**:

  - [x] Enable users to create, update, and delete cars.
  - [x] Handle empty and too-long names.
  - [x] Delete cars from "garage".
  - [ ] Delete cars from "winners".

- [x] **Color Selection (10 points)**: Allow color selection from an RGB palette and display the selected color on the car's image.

- [x] **Random Car Creation (20 points)**: Provide a button to create 100 random cars with randomly generated names and colors.

- [x] **Car Management Buttons (10 points)**: Provide buttons to update or delete cars near each car’s image.

- [x] **Pagination (10 points)**: Implement pagination for the "Garage" view .

---

### Winners View (50 points)

- [x] **Display Winners (15 points)**: After a car wins, it should be displayed in the "Winners" table.

- [x] **Pagination for Winners (10 points)**: Implement pagination for the "Winners" view (10 winners per page).

- [x] **Winners Table (15 points)**

- [ ] **Sorting Functionality (10 points)**: Allow users to sort the winners table by number of wins and best time, in ascending or descending order.

---

### Race (170 points)

- [x] **Start Engine Animation (20 points)**: When the user clicks the start engine button, the UI waits for the car's velocity, animates the car, and makes a request to drive. If the API returns a 500 error, the animation stops.

- [x] **Stop Engine Animation (20 points)**: When the user clicks the stop engine button, the UI waits for the engine stop response, and the car returns to its initial position.

- [x] **Responsive Animation (30 points)**: Ensure car animations are responsive and fluid on screens as small as 500px.

- [x] **Start Race Button (10 points)**: The start button should start the race for all cars on the current page.

- [x] **Reset Race Button (15 points)**: The reset button should return all cars to their starting positions.

- [x] **Winner Announcement (5 points)**: A message should display the name of the car that won after the race finishes.

- [x] **Button States (20 points)**: Disable the start engine button when the car is already driving, and disable the stop engine button when the car is at its starting position.

- [x] **Actions During the Race (50 points)**: Ensure proper control over actions during a race. Prevent or manage deleting, editing cars, changing views, or adding new cars. Make sure the race stops if needed, and the app works predictably.

---

### EXTRA POINTS (20 points)

- [x] **Empty Garage (10 points)**: Handle empty garage with a user-friendly message ("No Cars" or similar).

- [ ] **Empty Garage Page (10 points)**: If the last car is removed, automatically move the user to the previous page to avoid displaying an empty page.

---

### Prettier and ESLint Configuration (10 points)

- [x] **Prettier Setup (5 points)**: Prettier is set up with two scripts in the package.json:
- [x] **ESLint Configuration (5 points)**: ESLint is configured with the Airbnb style guide.
  - A `lint` script in package.json runs ESLint checks.
  - Strict TypeScript settings are configured based on `tsconfig.json`.

---

## Installation

Follow these steps to get the project up and running on your local machine:

1. Clone the repository.

```bash
  git clone <repository-url>
```

2. Navigate to the project directory.

   ```bash
   cd <project-name>
   ```

3. Install the dependencies by running the following command:
   ```bash
   npm install
   ```

## Running

```bash
npm run dev
```
