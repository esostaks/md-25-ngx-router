import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { selectBookCollection, selectBooks } from 'src/app/state/books.selectors';
import { BooksActions, BooksApiActions } from 'src/app/state/books.actions';
import { GoogleBooksService } from 'src/app/book-list/books.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  books$ = this.store.select(selectBooks);
  bookCollection$ = this.store.select(selectBookCollection);
 
  onAdd(bookId: string) {
    this.store.dispatch(BooksActions.addBook({ bookId }));
  }
 
  onRemove(bookId: string) {
    this.store.dispatch(BooksActions.removeBook({ bookId }));
  }
 
  constructor(private booksService: GoogleBooksService, private store: Store) {}
 
  ngOnInit() {
    this.booksService
      .getBooks()
      .subscribe((books) =>
        this.store.dispatch(BooksApiActions.retrievedBookList({ books }))
      );
  }
}

