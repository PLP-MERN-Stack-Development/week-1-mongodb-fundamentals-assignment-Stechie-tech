# MongoDB Bookstore Queries

This repository contains MongoDB queries for a bookstore database, demonstrating various MongoDB operations and features.

## 📚 Database Structure

The database contains a collection of books with the following fields:
- `title`: Book title
- `author`: Author name
- `genre`: Book genre
- `published_year`: Year of publication
- `price`: Book price
- `in_stock`: Availability status
- `pages`: Number of pages
- `publisher`: Publisher name

## 🔍 Basic CRUD Operations

### 1. Find Books by Genre
```javascript
db.books.find({ genre: "Fiction" });
```
This query retrieves all books in the "Fiction" genre.

### 2. Find Books Published After a Year
```javascript
db.books.find({ published_year: { $gt: 1950 } });
```
This query finds all books published after 1950.

### 3. Find Books by Author
```javascript
db.books.find({ author: "George Orwell" });
```
This query retrieves all books written by George Orwell.

### 4. Update Book Price
```javascript
db.books.updateOne(
    { title: "To Kill a Mockingbird" },
    { $set: { price: 14.99 } }
);
```
This query updates the price of "To Kill a Mockingbird" to $14.99.

### 5. Delete a Book
```javascript
db.books.deleteOne({ title: "Moby Dick" });
```
This query removes "Moby Dick" from the collection.

## 🚀 Advanced Queries

### 1. Find In-Stock Recent Books
```javascript
db.books.find({
    in_stock: true,
    published_year: { $gt: 2010 }
});
```
This query finds books that are both in stock and published after 2010.

### 2. Projection Query
```javascript
db.books.find(
    {},
    { title: 1, author: 1, price: 1, _id: 0 }
);
```
This query returns only the title, author, and price fields for all books.

### 3. Sorting Books by Price
```javascript
// Ascending order
db.books.find().sort({ price: 1 });

// Descending order
db.books.find().sort({ price: -1 });
```
These queries sort books by price in ascending and descending order.

### 4. Pagination
```javascript
// First page (5 books)
db.books.find().limit(5).skip(0);

// Second page (5 books)
db.books.find().limit(5).skip(5);
```
These queries implement pagination, showing 5 books per page.

## 📊 Aggregation Pipeline

### 1. Average Price by Genre
```javascript
db.books.aggregate([
    {
        $group: {
            _id: "$genre",
            averagePrice: { $avg: "$price" }
        }
    }
]);
```
This pipeline calculates the average price of books for each genre.

### 2. Author with Most Books
```javascript
db.books.aggregate([
    {
        $group: {
            _id: "$author",
            bookCount: { $sum: 1 }
        }
    },
    {
        $sort: { bookCount: -1 }
    },
    {
        $limit: 1
    }
]);
```
This pipeline finds the author who has written the most books in the collection.

### 3. Books by Publication Decade
```javascript
db.books.aggregate([
    {
        $group: {
            _id: {
                $floor: { $divide: ["$published_year", 10] }
            },
            count: { $sum: 1 }
        }
    },
    {
        $sort: { _id: 1 }
    }
]);
```
This pipeline groups books by their publication decade and counts them.

## 📈 Indexing

### 1. Single Field Index
```javascript
db.books.createIndex({ title: 1 });
```
Creates an index on the title field for faster searches.

### 2. Compound Index
```javascript
db.books.createIndex({ author: 1, published_year: 1 });
```
Creates a compound index on author and published_year fields.

### 3. Performance Analysis
```javascript
// Without index
db.books.find({ title: "To Kill a Mockingbird" }).explain("executionStats");

// With index
db.books.find({ title: "To Kill a Mockingbird" }).explain("executionStats");
```
These queries demonstrate the performance improvement using indexes.

## 🛠️ Setup and Usage

1. Install MongoDB Community Edition
2. Run the `insert_books.js` script to populate the database
3. Use MongoDB Shell (mongosh) or MongoDB Compass to run the queries
4. All queries are saved in `queries.js`

## 📝 Notes

- All queries are written in MongoDB shell syntax
- The database name is `plp_bookstore`
- The collection name is `books`
- Make sure MongoDB is running before executing queries
- Indexes should be created after data insertion for better performance 