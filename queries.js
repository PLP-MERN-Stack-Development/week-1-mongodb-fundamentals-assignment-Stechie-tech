// MongoDB Queries for PLP Bookstore Assignment

// Task 2: Basic CRUD Operations

// 1. Find all books in a specific genre
db.books.find({ genre: "Fiction" });

// 2. Find books published after a certain year
db.books.find({ published_year: { $gt: 1950 } });

// 3. Find books by a specific author
db.books.find({ author: "George Orwell" });

// 4. Update the price of a specific book
db.books.updateOne(
    { title: "To Kill a Mockingbird" },
    { $set: { price: 14.99 } }
);

// 5. Delete a book by its title
db.books.deleteOne({ title: "Moby Dick" });

// Task 3: Advanced Queries

// 1. Find books that are both in stock and published after 2010
db.books.find({
    in_stock: true,
    published_year: { $gt: 2010 }
});

// 2. Use projection to return only title, author, and price
db.books.find(
    {},
    { title: 1, author: 1, price: 1, _id: 0 }
);

// 3. Sort books by price (ascending and descending)
// Ascending
db.books.find().sort({ price: 1 });

// Descending
db.books.find().sort({ price: -1 });

// 4. Implement pagination (5 books per page)
// First page
db.books.find().limit(5).skip(0);

// Second page
db.books.find().limit(5).skip(5);

// Task 4: Aggregation Pipeline

// 1. Calculate average price by genre
db.books.aggregate([
    {
        $group: {
            _id: "$genre",
            averagePrice: { $avg: "$price" }
        }
    }
]);

// 2. Find author with the most books
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

// 3. Group books by publication decade and count them
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

// Task 5: Indexing

// 1. Create index on title field
db.books.createIndex({ title: 1 });

// 2. Create compound index on author and published_year
db.books.createIndex({ author: 1, published_year: 1 });

// 3. Demonstrate performance improvement with explain()
// Without index
db.books.find({ title: "To Kill a Mockingbird" }).explain("executionStats");

// With index
db.books.find({ title: "To Kill a Mockingbird" }).explain("executionStats");