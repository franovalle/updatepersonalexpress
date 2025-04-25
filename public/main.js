//var heart = document.getElementsByClassName("fa-heart");
var trash = document.getElementsByClassName("fa-trash-o");
var update = document.getElementsByClassName("fa-pencil");



/*Array.from(heart).forEach(function(element) {
      element.addEventListener('click', function(){
        const date = this.parentNode.parentNode.childNodes[1].innerText
        const entry = this.parentNode.parentNode.childNodes[3].innerText
        const heart = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
        fetch('entries', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            'date': date,
            'entry': entry,
            'heart': heart
          })
        })
        .then(response => {
          if (response.ok) return response.json()
        })
        .then(data => {
          console.log(data)
          window.location.reload(true)
        })
      });
});*/


Array.from(update).forEach(function(element) {
  element.addEventListener('click', function(){
   const date = this.parentNode.parentNode.childNodes[1].innerText
    const entry = this.parentNode.parentNode.childNodes[3].innerText
    //const heart = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
    fetch('entries', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'date': date,//Note to self: need to get some more help on a more efficient way to do this 
        'entry': 'Daily Reminder: Going thru a tough time, remember He is not done with you yet, so try again, can wait till your next post. Love you!'
        

      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

//Note to self: thinking of adding a strikeout feature of the bad day not only delete- I need to follow up. 




Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
       const date = this.parentNode.parentNode.childNodes[1].innerText
        const entry = this.parentNode.parentNode.childNodes[3].innerText
        fetch('entries', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'date': date,
            'entry': entry
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
