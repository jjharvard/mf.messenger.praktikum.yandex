Учебный проект. 4 спринт Yandex Практикума.

[https://yandex-praktikum-messenger.herokuapp.com](https://yandex-praktikum-messenger.herokuapp.com)

<br/>
Команда для компиляции проекта:
<br/>
yarn build
<br/>
Команда для запуска локальных тестов:
<br/>
yarn test
<br/>
Команда для запуска локального сервера:
<br/>
yarn serve
<br/>
Чат будет работать по адресу http://localhost:3000/index.html
<br/>
Деплой в Heroku:
<br/>
yarn deploy
<br/>

Много занимался нативной разработкой под Android, что тоже фронтэнд как бы, 
но так как JS и Java очень разные, говорят что эти два мира почти не пересекаются. Делая проект было интересно проверить самому,
получится ли применить подходы к Android разработке здесь. 

В Android нет dom и html, разметка делается на xml, а тэги элементов - это конструкторы нативных вьюх на Java. Компоненты приложения
имеют к ним доступ только по id, получается такой гамбургер в котором котлета xml, а булочка Java. Здесь тоже получилось что-то подобное.

В Android все компоненты видимые на экране наследуются от класса View, те которые содержат другие вьюхи - ViewGroup, здесь это Component и ComponentGroup.
Логика рендеринга получилась такая же как в Android, компоненты выстраиваются в дерево и просто обходятся слево направо.

Паттерн MVC во фронтэнд разработке нереализуем, потому что события от пользователя приходят во вью, а не в контроллер. Поэтому нужно чтобы были компоненты
являющиеся одновременно и вьюхой и контроллером. В приложении их имена заканчиваются на Component. Например ChatRootComponent, это аналог Activity/Fragment
в Android. Можно было бы вынести бизнес логику в Presenter (MVP), ну да ладно 'И так сойдет!') 

EventBus имеет тот же интерфейс, что и https://github.com/greenrobot/EventBus. Получилось в один класс реализовать, благодаря утиной типизации в Typescript. В Java он гораздо
сложнее реализуем. Много где пользоваться им избегал, поначалу кажется: 'Ух ты, как удобно!', а через время - 'О, нет, все захламлено ивентами, я не знаю откуда они прилетают!'

Класс Page задумывался как контекст и дожен был оборачивать компоненты и одновременно передавать им самого себя. Содержать ссылки на ресурсы приложения, такие 
как storage, history, window, assets и т п. Но оказалось что все глобально (в том числе и множество статических методов) - нет смысла в нем.

Работа с АПИ, изначально стремился сделать как в https://square.github.io/retrofit/. Но что-то явно пошло не так, в итоге получилось как получилось)

StateUtil - это аналог SharedPreferences в Android. Все мелкое, что не попадает в базу, но должно быть закешировано туда попадает. Хотя массив юзеров UserData[] - это явно не 
мелочь, все равно положил в него, потому что проект ученический (плюс я пока не знаю как здесь пользоваться базой))

Работу со списками вьюх тоже сделал по тому же принципу как в Android. Тот же самый метод notifyDataSetChanged (здесь notify), вызывается в момент изменения массива с 
данными, которые отображаются во вьюхах списка. Отличие только в том, что в Android создание каждого элемента списка очень дорого, и они создаются только в том количестве,
которое помещается на страницу, а при скролле переиспользуются. Не знаю, может и здесь так нужно было делать, но вроде работает без лагов. Может dom эту оптимизацию берет на себя.

Навигация в Android всегда делалась как зря, можно было стартовать другой экран из любого места в приложении любым экзотическим способом. История превращалась в винегрет.
И только недавно появился NavController, который пытается все упорядочить. Здесь из-за ограничений браузера по работе с историей, роутер тоже получается не очень красивый,
хотя может я не допонял как правильно нужно делать.

В Android есть еще так называемый Manifest. XML файл в котором кроме имен классов основных компонентов и технической информации ничего нет, что-то подобное получилось в index.ts

В общем и целом, может быть все это мне только кажется и я пытаюсь натянуть сову но глобус, но все таки, что-то общее между Веб и Android наблюдается. 
Typescript/Java так точно.

P.S. В следующем проекте обязательно буду пользоваться абсолютными импортами)



















