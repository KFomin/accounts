## 🏦 Banking Web App with Angular 🚀
Hi there! 👋 This is a web app for managing bank accounts. It has just 3 pages:

##### Bank accounts 🏦
##### Transactions (specific to each account) 💳
##### Transfer (for moving money between accounts) 💸
### 🚀 How to Run the Project Locally?
To run the app locally, clone the repository to your machine, go to the folder with the cloned code, and run in the terminal:

```
npm install  
```

Then, run:

```
npx json-server --watch src/db.json  
```

This will start a local JSON server (we’re using it to simulate a backend API and a database with our accounts and transactions). 📡

And finally:

```
ng serve  
```
to launch the web app itself. 🚀

## 📝 Development Notes
### 1️⃣ Bank Accounts Page 🏦
Here we have a simple table with 3 columns: account name, account number, and balance. 💰

To make it easier to access transactions, I added a 4th column with a "Transactions" button that takes you directly to the transactions for that specific account. 🔍

I also added a "Transfer" button on this page to go to the money transfer page. But during testing, I got so lazy about selecting two accounts every time that I ended up adding this button to each account in the table as a 5th column. Now, when you click "Transfer," the "From" account number is already selected based on which account you clicked the button on. 😎 (I pass the needed account via queryParams).

#### 🚨 Problem:
On mobile devices, this many columns doesn’t fit the screen width. 📱

#### 🛠 Solution:
I made a separate template for the mobile version, where I moved the account name and the two buttons into a collapsible section (when you click the row or a special button, the row expands downward, and there you’ll find the name and buttons).

Now it looks great! ^_^

### 2️⃣ Transfer Page 💸
Nothing too complicated here, but I wanted all transfers to show up in the transactions, so I had to simulate backend API behavior in the frontend service (it doesn’t look very clean, but I only need it for the example, so it’s fine :D).

No issues with the visual part—it’s just 2 dropdown selects and 2 fields (plus 2 buttons: cancel and submit). It fits on any screen without problems. 📱

I added form validation using Angular form validation and wrote 2 custom validations:

To make sure the accounts in the selects are different.
To make sure the amount isn’t greater than the balance of the "From" account. ✅
### 3️⃣ Transactions Page 💳
Just a table of transactions for a specific account. We get the account ID from the route parameters.

That’s it, nothing interesting here for transactions :D

### 🎨 Styling Notes
I had to figure out how to apply a non-standard color scheme for Angular Material, but I think I got it, and now everything looks pretty nice. 🖌️  
