# Note-Taker

https://note-taker898989-12171e1c39d2.herokuapp.com/
https://note-taker898989-12171e1c39d2.herokuapp.com/notes

With this code, I used the express and fs modules to make an application that was able to write, save, and delete notes, giving each note it's own unique id. Using express, I'm able to create routes between the pages, as well as post the information that I'm JSON'ing onto the page. When the button on the index.html page is clicked, on the initial web page, you are brought to the /notes, or notes.html section of the website. From there, you are able to write both a title and text under the title for a note, after content is filled for both of those sections, a save option appears in the nav bar so you can save the note, to the side bar. When the trash button is clicked next to the note, it is deleted from the side bar. 

![ddd](https://github.com/dsullivan42/Note-Taker/assets/97996876/67d49e3f-21c8-43e3-ab19-12e43b659949)


I commented on the code, but I found the const port = process.env.PORT || 3000; line on stack overflow, because I was using the const port = 3001; code from our class activities, and that wasn't working.
