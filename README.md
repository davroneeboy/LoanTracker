# Greystone Labs Frontend Code Challenge

## Online Demo

- [Vercel App](https://andynullwong-gl-frontend.vercel.app/)

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/andynullwong/greystone-frontend.git
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm run dev
   ```

## Features (Core)

- [**Create a User:**](src/app/users/create/page.tsx) Users can create an account to access the app.
- [**Create a Loan:**](src/app/loans/create/page.tsx) Users can create a new loan, specifying the initial principal balance, interest rate, and amortization term.
- [**Fetch all User’s Loans:**](src/app/users/page.tsx) Users can view a list of all their saved loans.
- [**Fetch the Amortization Term for a Loan:**](src/app/loans/[loanId]/page.tsx) Users can retrieve the amortization schedule for a specific loan.
- [**Share a Loan with another User:**](src/app/loans/[loanId]/share/page.tsx) Users can share their loan details with other users.
- [**Manage Current User State:**](src/context/user.context.tsx) Users can switch between profiles (User Ids) to perform operations on Loans that the specific users have access to.

## Features (Extra)

- [**Edit Loan Details:**](src/app/loans/[loanId]/update/page.tsx) Was not specified in the scoring rubric but was well documented. There was a minor bug discovered with this endpoint which I mitigated away with form validation. Documented in `API Bug 1`
- [**Form Validation:**](src/utils/formValidation.ts) Notifies end users when an input does not match the specified rule(s) and returns an error message.
- **Proper error handling:** All async functions have a catch and will throw a pop-up error message or at least provide a `console.error` at minimum.
- **Good style:** Leveraged Ant Design component library for faster velocity. For long term projects my preference is either TailwindCSS or at minimum Material UI.
- [**State & component testing:**](src/__tests__) Included Jest & React Testing Library support to the application and included some testing for key React Components that rely on state.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A Web Application framework.
- **Ant Design**: React UI component library.
- **Jest & React Testing Library**: For some simple snapshot testing of React Components.

## Design Decisions

- An `.env` file containing the URL of the external API is included in the root of the project strictly for convenience and should otherwise never be included in the repository. I decided to use [API Routes](src/app/api) as a simple API proxy for several reasons:

  1.  Since the API is semi-private and is not protected with an API key, the API routes will mask the API host.
  2.  Without visibility into how the external API will handle fetch requests on the client side, I wanted to reduce the risk of unforeseen issues like CORS errors.
  3.  Scalability: While this is just an assessment of the front-end, any application that relies on user scopes/permissions and other services will deal with sensitive or increasingly complex data. Introducing the API route now will allow for additional business logic or middleware functions to be added without cluttering the front-end components.

## Bugs Discovered / Feedback

- API Bug 1: When editing an existing Loan, assigning an `Owner ID` that is different that the current `User ID` does not throw an error on the API side and instead behaves as if I just shared the Loan to the newly assigned Owner. This issue is prevented on the Front-End using form validations.
- API Bug 2: The `One-Many` or `Many-Many` relation between `User` and `Loan` is not enforced on the database. I was able to insert invalid User IDs, such as `0` or `999`. This risk is mitgated on the front end with form validations or limiting the options to valid users using the [`SelectDropdown`](src/components/SelectDropdown.tsx) Component of all Users.
- Documentation: `POST: /loans/{loan_id}/share` is stating that a `200` response is a `string` type while the API is actually returning `[string]`. For now I prevented this issue by checking the 0th element's value in [`SelectDropdown` L51](src/components/SelectDropdown.tsx#L51)
- Documentation: `LoanSchemaBase.status` is stated as a `string` but should more accurately be described as an `enum` of `active` and `inactive`. I only discovered this while testing invalid inputs.
- API Spec: There are certain instances where the API Doc is missing certain information or the API response code and body could be more descriptive which leads to errors being caught later than preferred or resulting in awkward union types because they all share the same HTTP Status Code. An example can be found in [`LoanRange.tsx`  L19](src/app/loans/[loanId]/page.tsx#L19)
  - Current Behavior:
    - Request: `GET: /api/loans/35?user_id=5`
    - Response: `200 OK: { "detail": "User 5 does not have access to loan 35" }`
  - Expected Behavior:
    - Response: `403 Forbidden: { "detail": "User 5 does not have access to loan 35" }`
