/*
Что есть:
1. Генерация фиксированного плана дня
2. Автоформатирование

Что осталось сделать:
1. Масштабирование под экран
2. Выделение текущей строки
*/

// Общие функции
function rnd(max) {
  //console.log('Генерация случайного числа');
  let result = Math.floor(Math.random() * max)
  //console.log('Генерация .. ок')
  return result
}
function rnd2(min, max) {
  //console.log('Генерация случайного числа с двумя параметрами');
  let result = min + Math.floor(Math.random() * (max - min))
  //console.log('Генерация .. ок');
  return result
}
function percent(value) {
  //console.log('Генерация процента от 0 до 100');
  let result = Math.random() < p / 100
  //console.log('Генерация .. ок');
  return result
}
function gen_fileName() {
  console.log('Генерация названия файла')
  let fileName = ''
  for (let i = 0; i < 20; i += 1) {
    if (percent(50)) fileName += String.fromCharCode(rnd2(48, 57))
    else if (percent(51)) fileName += String.fromCharCode(rnd2(65, 90))
    else fileName += String.fromCharCode(rnd2(97, 122))
  }
  console.log('Генерация .. ок')
  return fileName
}
async function UrlExists(url) {
  console.log('Проверка доступа...')
  try {
    const response = await fetch(url, { method: 'HEAD' });
    console.log('Ресурс доступен')
    return response.ok;
  } catch (error) {
    console.log('Ресурс не доступен')
    return false;
  }
}
function input(text) {
  console.log('Запрос текста')
  let result = ''
  while (result == null || result.length < 1) {
    result = prompt(text)
    if (result == null || result.length < 1)
      alert('Название слайда должно состоять, как минимум, из 1 символа!')
  }
  console.log('Запрос .. ок')
  return result
}

function copy_func() {
  let text = "";
  for (let i = 0; i < clean_plan.length; i++) {
    text += clean_plan[i] + "\n";
  }
  // Создаем скрытый элемент для хранения текста
  var tempInput = document.createElement('textarea');
  tempInput.style.wrap="hard"
  
  // Устанавливаем значение этого элемента равным переданному тексту
  tempInput.value = text;
  
  // Добавляем элемент в DOM, чтобы он был доступен для манипуляций
  document.body.appendChild(tempInput);
  
  // Устанавливаем фокус на этот элемент и выбираем его содержимое
  tempInput.select();
  
  // Попытка скопировать выбранное в буфер обмена
  try {
    document.execCommand('copy');
    console.log('Текст успешно скопирован в буфер обмена!');
  } catch (err) {
    console.error('Ошибка при попытке скопировать текст: ', err);
  }
  
  // Удаляем элемент из DOM
  document.body.removeChild(tempInput);
}

function currentTimeInMinutes() {
    // Получаем текущее время
    var now = new Date();
    // Вычисляем количество минут с начала дня
    var minutes = now.getHours()  *  60 + now.getMinutes();
    return minutes;
}

function get_time(string) {
  try {
    return Number(string[0]+string[1]) + Number(string[3]+string[4]) * 60;
  } catch {
    return 0;
  }
}

console.log('Инициализация данных');
let b_copy = document.getElementById('copy');
let b_plan = document.getElementById('plan');
let b_tasks = document.getElementById('tasks');
let b_links = document.getElementById('links');
let b_edit = document.getElementById('edit');

// Действия по событию
b_copy.onclick = copy_func

let clean_plan = "";
let plan = "";

let date = new Date();
let day = date.getDay() - 1;
if (day > 6) {
  day -= 7;
}
let monthDay = date.getDate()

if (day == 0) {
  tasks.push("1. Разминка");
  tasks.push("2. 4x25 приседания");
  tasks.push("3. 4x10 отжимания");
  tasks.push("4. Растяжка");
}
if (day == 2) {
  tasks.push("1. Разминка");
  tasks.push("2. 4x5 подтягивания");
  tasks.push("3. 4x5m эспандер");
  tasks.push("4. Растяжка");
}
if (day == 4) {
  tasks.push("1. Разминка");
  tasks.push("2. 4x5m бег");
  tasks.push("3. 4x");
  tasks.push("4. Растяжка");
}
if (day == 6) {
  tasks.push("1. Разминка");
  tasks.push("2. 4x10m слепая печать");
  tasks.push("3. 4x10m программирование python");
  tasks.push("4. Растяжка");
}
if (monthDay == 1) {
  tasks.push("Пополнить кредитку");
  tasks.push("Составить план на месяц");
}

training = [
  "<a href='https://youtu.be/9UlvDqGHvNE'>мгновенная эволюция</a>",
  "<a href='https://monkeytype.com/'>слепая печать</a>",
  "<a href='https://schultetable.ru/training/en/'>шульте</a>",
  "<a href='https://stepik.org/course/58852/syllabus'>python</a>",
  "<a href='https://www.sololearn.com/en/learn/courses/c-plus-plus-introduction?location=2'>c++</a>",
  "<a href='https://www.litres.ru/'>чтение</a>",
  "порядок(файлы, блокноты)"
]

tasks = [
  "Делать диплом",
  "Установить vim на windows",
  "Установить vim на linux",
  "Установить obsidian на windows",
  "Установить obsidian на linux",
  "Настроить синхронизацию",
];

let tasks_for_day = "";
tasks_for_day += "<div class='dropdown'>";
tasks_for_day += "<button>задачи на день</button>";
tasks_for_day += "<div class='dropdown-content'>";
tasks_for_day += "<table>";
tasks_for_day += "<tr>";
tasks_for_day += "<td>";
tasks_for_day += "<pre>";
for (let i = 0; i < tasks.length; i++) {
  tasks_for_day += i+1 + ". " + tasks[i];
  if (i < tasks.length) {
    tasks_for_day += "<br>";
  }
}
tasks_for_day += "</pre>";
tasks_for_day += "</td>";
tasks_for_day += "</tr>";
tasks_for_day += "</table>";
tasks_for_day += "</div>";
tasks_for_day += "</div>";






let time = 0;
function currentTimeInMinutes2() {
  return time;
}





function show_plan() {
  clean_plan = [
  "05:00 :",
  "  1. зубы",
  "  2. рот",
  "  3. холодный душ",
  "  4. 100 приседаний",
  "  5. 40 отжиманий",
  "06:00 :",
  "  1. приготовить завтрак",
  "  2. поесть",
  "  3. помыть посуду",
  "07:00 :",
  "  1. " + training[day],
  "  2. <a href='https://www.duolingo.com/learn'>duolingo</a>",
  "08:00 :",
  "  1. изучить " + tasks_for_day,
  "  2. начать работу",
  "12:00 :",
  "  1. приготовить обед",
  "  2. поесть",
  "  3. помыть посуду",
  "13:00 - продолжить работу",
  "17:00 :",
  "  1. приготовить ужин",
  "  2. поесть",
  "  3. помыть посуду",
  "18:00 - тренировка/чтение",
  "19:00 - доделать то что утром не успел",
  "20:00 :",
  "  1. оценить ситуацию",
  "  2. составить планы на будущее",
  "  3. подготовить ресурсы",
  "  4. обновить данный план",
  "21:00+:",
  "  1. стирка",
  "  2. уборка",
  "  3. порядок в пространстве",
  "  4. мантра медитация",
  "  5. сон"
  ]
  
  for (let i = 0; i < clean_plan.length; i++) {
    if (get_time(clean_plan[i]) >= currentTimeInMinutes2()) {
      clean_plan[i] = "<p style='background=#000'>"+clean_plan[i]+"</p>";
      //break;
    }
  }
  
  plan = "<pre>";
  for (let i = 0; i < clean_plan.length; i++) {
    plan += clean_plan[i] + "<br>";
  }
  b_plan.innerHTML = plan + "</pre>";
  
  console.log(time);
  time += 60;
}
show_plan();

links = [
  "<a href='https://onedrive.live.com/edit?id=895C6778A551341F!367&resid=895C6778A551341F!367&wdPreviousSession=2f9fa1ef-93a8-4170-a8f8-adb404800fe4&wdo=2&cid=895c6778a551341f'>Диплом</a>",
  "<a href='https://keep.google.com/#NOTE/1UAdCxyjUpENXXr1AJEpnVkwpg_D22qxXZOYNupThSTwZDMBDILyxmV1SAbmJv8gLpqKn'>Google keep</a>",
  "<a href='https://docs.google.com/document/u/0/?pli=1'>Google Docs</a>",
  "<a href='http://www.youryoga.ru/school/conversations/3141592-nachalo-obuchenija-v-shkole-veretennikova.3584/'>Твоя йога</a>",
];

let links_to_show = "";
links_to_show += "<div class='dropdown'>";
links_to_show += "<button>Ссылки</button>";
links_to_show += "<div class='dropdown-content'>";
links_to_show += "<table>";
links_to_show += "<tr>";
links_to_show += "<td>";
links_to_show += "<pre>";
for (let i = 0; i < links.length; i++) {
  links_to_show += links[i];
  if (i < links.length) {
    links_to_show += "<br>";
  }
}
links_to_show += "</pre>";
links_to_show += "</td>";
links_to_show += "</tr>";
links_to_show += "</table>";
links_to_show += "</div>";
links_to_show += "</div>";
b_links.innerHTML = links_to_show;

links = [
  "<a href='https://neocities.org/site_files/text_editor?filename=index.html'>html</a>",
  "<a href='https://neocities.org/site_files/text_editor?filename=script.js'>javascript</a>",
  "<a href='https://neocities.org/site_files/text_editor?filename=style.css'>css</a>",
];

links_to_show = "";
links_to_show += "<div class='dropdown'>";
links_to_show += "<button>Редактировать</button>";
links_to_show += "<div class='dropdown-content'>";
links_to_show += "<table>";
links_to_show += "<tr>";
links_to_show += "<td>";
links_to_show += "<pre>";
for (let i = 0; i < links.length; i++) {
  links_to_show += links[i];
  if (i < links.length) {
    links_to_show += "<br>";
  }
}
links_to_show += "</pre>";
links_to_show += "</td>";
links_to_show += "</tr>";
links_to_show += "</table>";
links_to_show += "</div>";
links_to_show += "</div>";
b_edit.innerHTML = links_to_show;

setInterval(show_plan, 1000);




