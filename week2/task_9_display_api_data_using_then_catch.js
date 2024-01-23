/* eslint-disable prefer-template */
/* eslint-disable no-console */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-undef */
const myBtn = document.getElementById('myButton');
const myContainer = document.getElementById('container');
let dataAlreadyFetched = false;

myBtn.addEventListener('click', function () {
  if (dataAlreadyFetched) return;
  const dataContainer = document.createElement('div');

  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then((response) => response.json())
    .then((json) => {
      const userId = document.createTextNode('User ID : ' + JSON.stringify(json.userId));
      const id = document.createTextNode('ID : ' + JSON.stringify(json.id));
      const title = document.createTextNode('TITLE : ' + JSON.stringify(json.title));
      const completed = document.createTextNode('COMPLETED : ' + JSON.stringify(json.completed));
      dataContainer.appendChild(document.createElement('br'));
      dataContainer.appendChild(userId);
      dataContainer.appendChild(document.createElement('br'));
      dataContainer.appendChild(id);
      dataContainer.appendChild(document.createElement('br'));
      dataContainer.appendChild(title);
      dataContainer.appendChild(document.createElement('br'));
      dataContainer.appendChild(completed);
      dataContainer.appendChild(document.createElement('br'));
      myContainer.appendChild(dataContainer);
      dataAlreadyFetched = true;
      console.log(JSON.stringify(json));
    })
    .catch((err) => console.log(err));
});
