async function fetchData() {
  console.log("fetch");
  try {
    const response = await fetch("/feedbacks");
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();

    const container = document.getElementById("feedbacks-container");

    container.innerHTML = "";

    data.forEach((item) => {
      const div = document.createElement("div");
      const text = document.createTextNode(`${item.username}: ${item.text}`);
      
      // Apply styling to the div
      div.style.border = '1px solid #ccc';
      div.style.borderRadius = '5px';
      div.style.padding = '10px';
      div.style.marginBottom = '10px';
      div.style.backgroundColor = '#f9f9f9';
      div.style.overflowWrap = 'break-word'; // Text wrapping
      
      div.appendChild(text);
      container.appendChild(div);
  });
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function setBc(elem) {
  elem.style.backgroundColor = "yellow";
}

function resetBc(elem) {
  elem.style.backgroundColor = "white";
}

function changeBodyBc(event) {
  if (event.key === "r" || event.key === "R") {
    document.querySelector(".bodyBack").style.backgroundColor = "#FFCCCC"; // Пастельний червоний
  } else if (event.key === "o" || event.key === "O") {
    document.querySelector(".bodyBack").style.backgroundColor = "#FFD8B8"; // Пастельний помаранчевий
  } else if (event.key === "y" || event.key === "Y") {
    document.querySelector(".bodyBack").style.backgroundColor = "#FFFFCC"; // Пастельний жовтий
  } else if (event.key === "g" || event.key === "G") {
    document.querySelector(".bodyBack").style.backgroundColor = "#CCFFCC"; // Пастельний зелений
  } else if (event.key === "b" || event.key === "B") {
    document.querySelector(".bodyBack").style.backgroundColor = "#CCE5FF"; // Пастельний голубий
  } else if (event.key === "v" || event.key === "V") {
    document.querySelector(".bodyBack").style.backgroundColor = "#E5CCFF"; // Пастельний фіолетовий
  } else {
    document.querySelector(".bodyBack").style.backgroundColor = "lightgray"; // Пастельний фіолетовий
  }
}

document.onkeydown = function (event) {
  changeBodyBc(event);
};

function setCol(elem) {
  elem.style.color = "red";
}

document.addEventListener("DOMContentLoaded", function (event) {
  // Отримуємо всі елементи <td>
  var tds = document.getElementsByTagName("td");

  // Прив'язуємо обробник події для кожного елемента <td>
  for (var i = 0; i < tds.length; i++) {
    // Додати обробник подій для наведення миші
    tds[i].addEventListener("mouseover", function () {
      this.style.color = "red"; // Змінюємо колір тексту на червоний
    });

    // Додати обробник подій для зняття миші
    tds[i].addEventListener("mouseout", function () {
      this.style.color = "black"; // Відновлюємо початковий колір тексту
    });
  }
});

document.addEventListener("DOMContentLoaded", function (event) {
  fetchData();

  // Отримуємо всі елементи <td>
  var tds = document.getElementsByTagName("button");

  // Прив'язуємо обробник події для кожного елемента <td>
  for (var i = 0; i < tds.length; i++) {
    // Додати обробник подій для наведення миші
    tds[i].addEventListener("mouseover", function () {
      this.style.fontSize = "1.2em"; // Змінюємо колір тексту на червоний
    });

    // Додати обробник подій для зняття миші
    tds[i].addEventListener("mouseout", function () {
      this.style.fontSize = "1em"; // Відновлюємо початковий колір тексту
    });
  }
});

document.addEventListener("DOMContentLoaded", function (event) {
  // Отримуємо всі елементи <td>
  var tds = document.getElementsByTagName("img");

  // Прив'язуємо обробник події для кожного елемента <td>
  for (var i = 0; i < tds.length; i++) {
    // Додати обробник подій для наведення миші
    tds[i].addEventListener("mouseover", function () {
      this.style.maxWidth = "500px"; // Змінюємо колір тексту на червоний
    });

    // Додати обробник подій для зняття миші
    tds[i].addEventListener("mouseout", function () {
      this.style.maxWidth = "350px"; // Відновлюємо початковий колір тексту
    });
  }
});

document.addEventListener("DOMContentLoaded", function (event) {
  document.getElementById("sendMessage").addEventListener("submit", checkForm);

  async function checkForm(event) {
    event.preventDefault();
    var elem = document.getElementById("sendMessage");

    var post = elem.username.value;
    var mess = elem.text.value;

    var fail = "";

    if (post == "" || mess == "") {
      fail = "Введіть всі дані";
    } else if (post.split("@").length != 2) {
      fail = "Некоректно введена пошта";
    }

    if (fail != "") {
      alert(fail);
    } else {
      if (confirm("Ви впевнені?")) {
        try {
          const data = {
            username: post,
            text: mess,
          };

          const response = await fetch("/feedback", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          fetchData();
          alert("Повідомлення успішно відправлено!");
        } catch (error) {
          console.error("Fetch error:", error);
          responseMessage.textContent = "Error submitting feedback";
          responseMessage.style.color = "red";
        }
      } else {
        alert("Відправлення скасовано!");
      }
    }
  }
});

document.addEventListener("DOMContentLoaded", function (event) {});
