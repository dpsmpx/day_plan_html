/*
Done:
1. Day plan generation
2. Autoformatting
3. Scaling for screen
4. Current line indication
5. Delete over variables
6. Weekday line

ToDo:
. Generate markdown TODO list
. Add cognifit
. Add running
. Add config.txt and file load function for simple using
. Add day types: on work, free day
. Fix copying
. Add clear TODO-list
. Delete now line selection to simplify code
*/

function loadFileAsString(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e.target.error);
        reader.readAsText(file);
    });
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
    return Number(string[0]+string[1]) * 60 + Number(string[3]+string[4]);
  } catch {
    return 24 * 60;
  }
}

function get_hidden(name, lines) {
  let result = "<div class='dropdown'>";
  result += "<button>" + name + "</button>";
  result += "<div class='dropdown-content'>";
  result += "<table><tr><td><pre>";
  for (let i = 0; i < lines.length; i++) {
    result += (i+1) + ". " + lines[i];
    if (i < lines.length) {
      result += "<br>";
    }
  }
  return result += "</pre></td></tr></table></div></div>";
}

let b_copy = document.getElementById('copy');
let b_plan = document.getElementById('plan');
let b_tasks = document.getElementById('tasks');
let b_links = document.getElementById('links');
let b_edit = document.getElementById('edit');
let b_rules = document.getElementById('rules');

// Действия по событию
b_copy.onclick = copy_func

let weekdays = [
  "понедельник",
  "вторник",
  "среда",
  "четверг",
  "пятница",
  "суббота",
  "воскресенье",
]

let date = new Date();
let day = date.getDay()-1;
if (day > 6) {
  day -= 7;
}
if (day < 0) {
  day += 7;
}
let monthDay = date.getDate()

let mind_training = [
  "<a href='https://youtu.be/9UlvDqGHvNE'>мгновенная эволюция</a>",
  "<a href='https://monkeytype.com/'>слепая печать</a>",
  "<a href='https://schultetable.ru/training/en/'>шульте</a>",
  "<a href='https://stepik.org/course/58852/syllabus'>python</a>",
  "<a href='https://www.sololearn.com/en/learn/courses/c-plus-plus-introduction?location=2'>c++</a>",
  "<a href='https://www.memrise.com/ru/?roistat_visit=55438405'>memrise</a>",//https://quizlet.com/?roistat_visit=55438405'>quizlet</a>",
  "<a href='https://www.duolingo.com/learn'>duolingo</a>"
]

let body_training = [
  "4x25 приседаний",
  "4x10 отжиманий",
  "4x5 подтягиваний",
  "4x10 пресс (ролик, турник, скручивания)",
  "40m растяжка",
  "40m бег",
  "40m растяжка",
]

let tasks = [
  "изучить vim",
  "синхронизировать obsidian",
];

let tasks_for_day = get_hidden("задачи на день", tasks);

if (monthDay == 1) {
  tasks.push("Пополнить кредитку");
  tasks.push("Сделать план на месяц");
}

let free_time = [
  "чтение",
  "практика Кастанеды", 
  "чтение",
  "практика Кастанеды", 
  "чтение", 
  "практика Кастанеды", 
  "чтение"
]

let evening_task = [
  "перепросмотр",
  "порядок в файлах",
  "порядок в вещах",
  "перепросмотр",
  "порядок в файлах",
  "порядок в вещах",
  "перепросмотр"
]

/* пример
05:25 - подъём
05:30 - зубы, рот, холодный душ
05:40 - 100 приседаний, 40 отжиманий
06:00 - мгновенная эволюция/слепая печать/шульте/python/c++/чтение/порядок(файлы, блокноты)
07:00 - english
08:00 - изучить задачи на день - Obsidian
08:20 - начать работу
12:30 - приготовить обед, поесть, помыть посуду
13:20 - продолжить работу
17:40 - приготовить ужин, поесть, помыть посуду
18:30 - тренировка/чтение
19:30 - доделать то что утром не успел
20:00 - оценить ситуацию
20:10 - составить планы на будущее
20:30 - обновить данный план
20:40 - подготовить ресурсы
21:00 - стирка, уборка, порядок в пространстве
21:20 - мантра медитация
21:45 - сон
*/

clean_plan = [
  "05:00 : зубы, рот, холодный душ",
  "06:00 : завтрак",
  "07:00 : " + mind_training[day],
  "08:00 : " + tasks_for_day,
  "12:00 : обед",
  "13:00 : работа, " + free_time[day],
  "17:00 : ужин",
  "18:00 : доделать",
  "19:00 : " + body_training[day],
  "20:00 : " + evening_task[day],
  "21:00+: горячий душ, сон"
]

let pos = 0;
for (let i = 0; i < clean_plan.length; i++) {
  if (get_time(clean_plan[i]) <= currentTimeInMinutes()) {
    pos = i;
    continue;
  } else {
    break;
  }
}
clean_plan[pos] = "<b>"+clean_plan[pos]+"</b>";

plan = "";
for (let i = 0; i < clean_plan.length; i++) {
  plan += clean_plan[i] + "<br>";
}
b_plan.innerHTML = weekdays[day] + "<br>" + plan;

lines = [
  "<a href='https://onedrive.live.com/edit?id=895C6778A551341F!367&resid=895C6778A551341F!367&wdPreviousSession=2f9fa1ef-93a8-4170-a8f8-adb404800fe4&wdo=2&cid=895c6778a551341f'>диплом</a>",
  "<a href='https://keep.google.com/#NOTE/1UAdCxyjUpENXXr1AJEpnVkwpg_D22qxXZOYNupThSTwZDMBDILyxmV1SAbmJv8gLpqKn'>google keep</a>",
  "<a href='https://docs.google.com/document/u/0/?pli=1'>google docs</a>",
  "<a href='http://www.youryoga.ru/school/conversations/3141592-nachalo-obuchenija-v-shkole-veretennikova.3584/'>сайт твоя йога</a>",
];
b_links.innerHTML = get_hidden("ссылки", lines);

lines = [
  "<a href='https://neocities.org/site_files/text_editor?filename=index.html'>html</a>",
  "<a href='https://neocities.org/site_files/text_editor?filename=script.js'>javascript</a>",
  "<a href='https://neocities.org/site_files/text_editor?filename=style.css'>css</a>",
];
b_edit.innerHTML = get_hidden("редактировать", lines);

lines = [
  "25/5",
  "ум/тело",
  "тело/ум",
  "25/25",
  "перепросмотр",
];
b_rules.innerHTML = get_hidden("правила", lines);




