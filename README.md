��#   v e t t y 
Name:Shivam
Roll Number: Btech/10363/21
Branch: Electronics and Communication Engineering
College: Birla Institute of Technology, Mesra

 Problem Statement 
We want to implement a Jira board which will help us keep track of cards categorized into lists. For example - 
in the above figure, we have three list Todo, InProgress, etc. Each list can have any number of cards. For 
example, in the above figure Todo list has two cards. 
Mandatory attributes of each card -Header, desc, creation time and a cross(X) button to delete it. 
A new list can be added to the board by pressing the ADD LIST button present on the right side of the board. 
Each list should have a Header, a cross(X) button to delete it and can have 0 or more cards. Deleting a list 
should delete all the cards present in that list. 
A new card can be added to a list via a plus(+) button present at the bottom of each list(inside a list).  
A card can be dragged from one list and dropped on the second list to make it part of the second list. If it is 
dropped outside the second list, it comes back to the list from which it was picked up. 
Note (Mandatory Requirements) ---------  
1. Whenever a card is dropped on a list, the existing cards should rearrange themselves in reverse chronological 
order of their creation time.  
2. Duplicate cards are allowed in a list( A card is duplicate if it has the same title as some other card in a 
particular list. Two cards with the same title can exist in different lists.)  
3. On refreshing the page or opening the same page in a new tab, the existing lists and cards on the page should 
remain intact. 
4.For Fresher (<1 year experience), No need to do drag and drop and also it can be static (same as image with 
functionality).  
Keep in mind:  
1. Please use client side storage for your storage needs. You need to build only the client side of it, backend 
implementation is not expected.  
2. You can use JavaScript framework like Angular 10+ and tooling such as webpack, grunt, gulp, etc.  
3. Object-oriented JS code is a plus!  
4. You can use the HTML Drag and Drop API to implement DnD functionality. 
5. Form validation is good to have but not mandatory.  
6. Do not spend time on UI design (colors, fonts, shadow, gradients etc). Keep it simple as shown in the figure 
above. 
You will be evaluated based on: 
1. Correctness and completeness of the solution. 
2. Software Design(Low level design) & Coding Practices used. For ex - Clean Code, Modularity etc  
3. Technology choices (e.g. ES 6/7 over ES 5 - avoid mixing of ES 5/6/7). 

# **Project Setup & Run Guide**

## **Prerequisites**
Before starting, ensure you have the following installed on your system:
- **Node.js** (Download from [nodejs.org](https://nodejs.org/))
- **Angular CLI** (Install globally if not already installed)

## **Steps to Run the Project Locally**

### **1. Clone the Repository**  
If you haven't already downloaded the repository, clone it using:

```sh
git clone <repository_url>** **
2. Navigate to the Project Directory
Move into the project folder:

sh
Copy
Edit
cd <project-folder-name>
3. Install Dependencies
Run the following command to install required dependencies:

sh
Copy
Edit
npm install
4. Start the Development Server
Run the Angular application with:

sh
Copy
Edit
ng serve
To run it on a specific port:

sh
Copy
Edit
ng serve --port=4201
5. Open in Browser
Once the server starts, open the application in a browser:

arduino
Copy
Edit
http://localhost:4200
(Replace 4200 with the port you specified, if different.)

6. (Optional) Build for Production
To create a production-ready build, run:

sh
Copy
Edit
ng build --prod
7. (Optional) Troubleshooting
If the server fails to start, try the following:

sh
Copy
Edit
rm -rf node_modules package-lock.json
npm install
ng serve
