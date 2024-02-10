# Iterate
## Product Idea Input, Icon, and Recommendation

This project is a simple web interface built with React that allows users to enter product ideas or requests. It connects to an API endpoint to determine the relevant category of the entered product idea and displays an icon representing that category next to the input field. Additionally, the project displays a list of relevant products fetched from another API endpoint.

## Running the Project

To run this project locally, follow these steps:

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/SAYUK09/Iterate.git
    ```
2. Setup ENV File:

    Setup `.env` file with the help of `env.example` file

3. Install Product Dependencies:
    ```bash
    yarn install
    ```

4. Start Development Server:
    ```bash
    yarn run dev
    ```


# Usage
- Enter a product idea or request in the input field provided.
- Once you start typing, an icon representing the predicted category will appear next to the input field.
- As you continue typing, the icon may update based on the new predictions.
- Scroll down to view a list of relevant products matching the entered idea. 

# Technologies

- Frontend: React+Vite
- Icon Generation: OpenAI API
- Product Suggestions: Mock database

# Other Links
- [Iterate Backend](https://github.com/SAYUK09/Iterate-Backend)