# **Vetty Jira Board Implementation**

## **Candidate Details**
- **Name:** Shivam  
- **Roll Number:** Btech/10363/21  
- **Branch:** Electronics and Communication Engineering  
- **College:** Birla Institute of Technology, Mesra  

---

## **Problem Statement**
We want to implement a **Jira board** to track cards categorized into lists.  

### **Key Features**
- Each **list** can have any number of **cards**.  
- A list contains:  
  - **Header**  
  - **Cross (X) button** to delete the list (deleting a list removes all its cards).  
  - **Add card (+) button** to add new cards.  
- A card contains:  
  - **Header (Title)**  
  - **Description**  
  - **Creation time**  
  - **Cross (X) button** to delete the card.  
- Cards can be **dragged and dropped** between lists.  
- If a card is dropped outside any list, it returns to its original position.  

---

## **Mandatory Requirements**
1. Cards in a list must be arranged in **reverse chronological order** (newest first).  
2. **Duplicate cards** (same title) are allowed within a list but not across lists.  
3. The board's **state must persist** across page refreshes or reopening the tab.  
4. **For Freshers (<1 year experience):**  
   - Drag & Drop is **not required**.  
   - A static board (matching the provided image) with functionality is sufficient.  

---

## **Technical Constraints & Guidelines**
- Use **client-side storage** (LocalStorage or IndexedDB) for data persistence.  
- No backend implementation is required.  
- Use a **JavaScript framework** like **Angular 10+**.  
- Allowed tooling: **Webpack, Grunt, Gulp**.  
- Follow **Object-Oriented JavaScript** principles.  
- Use the **HTML Drag and Drop API** (if implementing Drag & Drop).  
- Form validation is **optional but good to have**.  
- **Keep UI simple** (no need for fancy design elements like colors, gradients, or shadows).  

---

## **Evaluation Criteria**
1. **Correctness & Completeness** of the solution.  
2. **Software Design** (Low-Level Design) and **Coding Practices** (Clean Code, Modularity, etc.).  
3. **Technology Choices** (e.g., prefer ES6/7 over ES5; avoid mixing different ES versions).  

---

# **Project Setup & Run**

## **Prerequisites**
Before starting, ensure you have the following installed on your system:
- **Node.js** (Download from [nodejs.org](https://nodejs.org/))  
- **Angular CLI** (Install globally if not already installed)  

## **Steps to Run the Project Locally**

### **1. Clone the Repository**
If you haven't already downloaded the repository, clone it using:

```sh
git clone https://github.com/tsarrasputin/vetty
```

## **2. Navigate to the Project Directory**
Move into the project folder:

```sh
cd vetty
```

## **3. Install Dependencies**
Run the following command to install required dependencies:

```sh
npm install
```

## **4. Start the Development Server**
Run the Angular application with:

```sh
ng serve
```
To run it on a specific port:

```sh
ng serve --port=4201
```
## **5. Open in Browser**
Once the server starts, open the application in a browser:

```sh
[ng serve](http://localhost:4200)
```



