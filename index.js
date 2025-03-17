const express=require('express');
const index=express ();
const PORT=process.env.PORT || 3000;

index.use(express.json());

const books = [];
  


index.listen(PORT, ()=>{
    console.log("Server Listening on PORT:", PORT);
  });

index.get('/whoami', (request, response)=>{
    // const status = {
    //    'Status': 'Running'
    // };
    
    // response.send(status);
    response.json({studentNumber:'2762460'})
});

index.get('/books', (request, response)=>{
    response.json(books);
  });


index.get('/books/:id', (request, response)=>{
const book = books.find(b => b.id===request.params.id); //Finds index of book
if (!book) {
    return response.status(404).json({ error: 'Book not found' });
}
response.json(book);
});

index.post('/books', (request, response)=>{
    const{id, title, details}=request.body;
    if(!id || !title || !details || !Array.isArray(details) || details.length===0){
        return response.status(400).json({error:'Details not found'})
    }
    books.push({id,title,details});
    response.status(201).json({id, title, details})
});

index.put('/book/:id', (request, response)=>{
    const {title, details} = request.body;
    const bookIndex = books.findIndex(b=>b.id===request.params.id);

    if (bookIndex === -1) {
        return res.status(404).json({ error: 'Book not found' });
    }

    books[booksIndex]={id:request.params.id, title, details};
    response.json(books[bookIndex]);
});

index.delete('/books/:id', (request, response)=>{
    const bookIndex = books.findIndex(b=>b.id===request.params.id);
    if(bookIndex===-1){
        return response.status(404).json({error:'Book not found'});
    }
    books.splice(bookIndex,1);
    response.status(204).end();
});

index.post('/books/:id/details',(request, response)=>{
    const { author, genre, publicationYear } = request.body;
    const book = books.find(b=>b.id===req.params.id);
    if (!book) {
        return res.status(404).json({ error: 'Book not found' });
    }

    const newDetail = {
        id: (book.details.length + 1).toString(),
        author,
        genre,
        publicationYear
    };
    books.details.push(newDetail);
    response.status(201).json(newDetail);
});

index.delete('/books/:id/details/:detailId' , (request, response)=>{
    const book = books.find(b=>b.id===request.params.id);
    if(!book) {
        return response.status(404).json({ error: 'Book not found'});
    }

    const detailIndex = book.details.findIndex(d=>d.id===req.params.detailId);
    if(detailIndex === -1) {
        return response.status(404).json({ error: 'Detail not found'});
    }

    book.details.splice(detailIndex, 1);
    response.status(204).end();
});


//  {
//     "id": "1",
//     "title": "To Kill a Mockingbird",
//     "details": [
//       {
//         "id": "1",
//         "author": "Harper Lee",
//         "genre": "Fiction",
//         "publicationYear": 1960
//       }
//     ]
//   }
  

