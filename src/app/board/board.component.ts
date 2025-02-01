import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DragDropModule, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { List, Card } from '../models/board.model';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, FormsModule, DragDropModule],
  template: `
    <div class="board">
      <div class="board-header">
        <h1>Jira Board</h1>
        <button class="add-list-btn" (click)="showNewListDialog()">ADD LIST</button>
      </div>
      
      <!-- New List Dialog -->
      <div *ngIf="showListDialog" class="dialog-overlay">
        <div class="dialog">
          <h2>Create New List</h2>
          <input 
            [(ngModel)]="newListName" 
            placeholder="Enter list name"
            class="dialog-input"
            (keyup.enter)="confirmNewList()"
          >
          <div class="dialog-actions">
            <button class="confirm-btn" (click)="confirmNewList()">Create</button>
            <button class="cancel-btn" (click)="cancelNewList()">Cancel</button>
          </div>
        </div>
      </div>
      
      <div class="board-lists" cdkDropListGroup>
        <div *ngFor="let list of lists" class="list">
          <div class="list-header">
            <h2>{{ list.header }}</h2>
            <button class="delete-btn" (click)="deleteList(list)">×</button>
          </div>
          
          <div class="list-content"
               cdkDropList
               [cdkDropListData]="list.cards"
               (cdkDropListDropped)="drop($event)">
            <div *ngFor="let card of list.cards" 
                 class="card"
                 cdkDrag>
              <div class="card-header">
                <h3>{{ card.header }}</h3>
                <button class="delete-btn" (click)="deleteCard(list, card)">×</button>
              </div>
              <p class="card-desc">{{ card.description }}</p>
              <small class="card-time">Created: {{ card.creationTime | date:'medium' }}</small>
            </div>
          </div>
          
          <div class="add-card">
            <button class="add-card-btn" (click)="showAddCard(list)">+ Add Card</button>
          </div>
          
          <div *ngIf="list.id === activeListId" class="card-form">
            <input [(ngModel)]="newCard.header" placeholder="Card Title" class="card-input">
            <textarea [(ngModel)]="newCard.description" placeholder="Description" class="card-textarea"></textarea>
            <div class="form-actions">
              <button class="confirm-btn" (click)="addCard(list)">Add</button>
              <button class="cancel-btn" (click)="cancelAddCard()">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .board {
      padding: 20px;
      min-height: 100vh;
      background: linear-gradient(135deg, #f6f8fa 0%, #e9ecef 100%);
    }

    .board-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      padding: 0 10px;
    }

    .board-header h1 {
      color: #172b4d;
      font-size: 24px;
      font-weight: 600;
    }

    .board-lists {
      display: flex;
      gap: 20px;
      overflow-x: auto;
      padding: 20px 10px;
      min-height: calc(100vh - 100px);
      align-items: flex-start;
    }

    .list {
      background: #ebecf0;
      border-radius: 8px;
      width: 300px;
      min-height: 100px;
      padding: 12px;
      flex-shrink: 0;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      padding: 0 4px;
    }

    .list-header h2 {
      color: #172b4d;
      font-size: 16px;
      font-weight: 600;
    }

    .list-content {
      min-height: 50px;
      margin-bottom: 10px;
    }

    .card {
      background: white;
      border-radius: 6px;
      padding: 12px;
      margin-bottom: 8px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      cursor: move;
      transition: box-shadow 0.2s ease;
    }

    .card:hover {
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
    }

    .card-header h3 {
      color: #172b4d;
      font-size: 14px;
      font-weight: 600;
      margin: 0;
    }

    .card-desc {
      margin: 8px 0;
      color: #5e6c84;
      font-size: 13px;
      line-height: 1.4;
    }

    .card-time {
      color: #6b778c;
      font-size: 11px;
      display: block;
      margin-top: 8px;
    }

    .delete-btn {
      border: none;
      background: none;
      font-size: 18px;
      cursor: pointer;
      color: #6b778c;
      padding: 4px;
      border-radius: 3px;
      line-height: 1;
      transition: background-color 0.2s ease;
    }

    .delete-btn:hover {
      background-color: rgba(0,0,0,0.05);
      color: #172b4d;
    }

    .add-card-btn {
      width: 100%;
      padding: 8px;
      background: transparent;
      border: none;
      color: #5e6c84;
      cursor: pointer;
      font-size: 13px;
      border-radius: 3px;
      transition: background-color 0.2s ease;
    }

    .add-card-btn:hover {
      background-color: rgba(0,0,0,0.05);
      color: #172b4d;
    }

    .card-form {
      background: white;
      padding: 12px;
      border-radius: 6px;
      margin-top: 8px;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
    }

    .card-input, .card-textarea, .dialog-input {
      width: 100%;
      margin-bottom: 8px;
      padding: 8px;
      border: 2px solid #dfe1e6;
      border-radius: 3px;
      font-size: 13px;
      transition: border-color 0.2s ease;
    }

    .card-input:focus, .card-textarea:focus, .dialog-input:focus {
      outline: none;
      border-color: #4c9aff;
    }

    .card-textarea {
      min-height: 80px;
      resize: vertical;
    }

    .form-actions, .dialog-actions {
      display: flex;
      gap: 8px;
    }

    .confirm-btn, .cancel-btn, .add-list-btn {
      padding: 6px 12px;
      border-radius: 3px;
      border: none;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      transition: background-color 0.2s ease;
    }

    .confirm-btn {
      background: #0052cc;
      color: white;
    }

    .confirm-btn:hover {
      background: #0047b3;
    }

    .cancel-btn {
      background: #ebecf0;
      color: #172b4d;
    }

    .cancel-btn:hover {
      background: #dfe1e6;
    }

    .add-list-btn {
      background: #0052cc;
      color: white;
      padding: 8px 16px;
      font-size: 14px;
    }

    .add-list-btn:hover {
      background: #0047b3;
    }

    .dialog-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .dialog {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 400px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .dialog h2 {
      margin: 0 0 16px;
      color: #172b4d;
      font-size: 20px;
    }

    .cdk-drag-preview {
      box-sizing: border-box;
      border-radius: 6px;
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2),
                  0 8px 10px 1px rgba(0, 0, 0, 0.14),
                  0 3px 14px 2px rgba(0, 0, 0, 0.12);
    }

    .cdk-drag-placeholder {
      opacity: 0;
    }

    .cdk-drag-animating {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }

    .list-content.cdk-drop-list-dragging .card:not(.cdk-drag-placeholder) {
      transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
    }
  `]
})
export class BoardComponent implements OnInit {
  lists: List[] = [];
  activeListId: string | null = null;
  newCard: Partial<Card> = {};
  showListDialog = false;
  newListName = '';
  private readonly STORAGE_KEY = 'jira-board-state';

  constructor() {
    this.loadState();
  }

  ngOnInit() {
    if (this.lists.length === 0) {
      this.addList('To Do');
    }
  }

  private saveState() {
    const state = {
      lists: this.lists.map(list => ({
        ...list,
        cards: list.cards.map(card => ({
          ...card,
          creationTime: card.creationTime.toISOString()
        }))
      }))
    };
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(state));
  }

  private loadState() {
    const savedState = localStorage.getItem(this.STORAGE_KEY);
    if (savedState) {
      const state = JSON.parse(savedState);
      this.lists = state.lists.map((list: any) => ({
        ...list,
        cards: list.cards.map((card: any) => ({
          ...card,
          creationTime: new Date(card.creationTime)
        }))
      }));
    }
  }

  showNewListDialog() {
    this.showListDialog = true;
    this.newListName = '';
  }

  cancelNewList() {
    this.showListDialog = false;
    this.newListName = '';
  }

  confirmNewList() {
    if (this.newListName.trim()) {
      this.addList(this.newListName.trim());
      this.showListDialog = false;
      this.newListName = '';
    }
  }

  addList(name: string) {
    const newList: List = {
      id: Date.now().toString(),
      header: name,
      cards: []
    };
    this.lists.push(newList);
    this.saveState();
  }

  deleteList(list: List) {
    const index = this.lists.indexOf(list);
    if (index > -1) {
      this.lists.splice(index, 1);
      this.saveState();
    }
  }

  showAddCard(list: List) {
    this.activeListId = list.id;
    this.newCard = {};
  }

  cancelAddCard() {
    this.activeListId = null;
    this.newCard = {};
  }

  addCard(list: List) {
    if (this.newCard.header && this.newCard.description) {
      const card: Card = {
        id: Date.now().toString(),
        header: this.newCard.header,
        description: this.newCard.description,
        creationTime: new Date()
      };
      list.cards.push(card);
      this.sortCardsByCreationTime(list.cards);
      this.saveState();
      this.cancelAddCard();
    }
  }

  deleteCard(list: List, card: Card) {
    const index = list.cards.indexOf(card);
    if (index > -1) {
      list.cards.splice(index, 1);
      this.saveState();
    }
  }

  sortCardsByCreationTime(cards: Card[]) {
    cards.sort((a, b) => b.creationTime.getTime() - a.creationTime.getTime());
  }

  drop(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.sortCardsByCreationTime(event.container.data);
    this.saveState();
  }
}