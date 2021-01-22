import { ViewGroup } from "../../abstract/ViewGroup";
export class Sidebar extends ViewGroup {
    getProps() {
        return {};
    }
    getTemplate() {
        return `<div class="sidebar">
        <ul class="sidebar__list">
            <li class="sidebar__item topic">
                <img class="topic__icon" src="img/bear.png" alt=""/>
                <div class="topic__author">Gudkov</div>
                <div class="topic__time">11.01.21</div>
                <div class="topic__teaser">
                    Hello you. Today I'm glad to introduce you a new team member Ivan Urgant. I'm looking forward to
                </div>
                <div class="topic__unread-wrapper"><p class="topic__unread-count">2</p></div>
            </li>
            <li class="sidebar__item topic">
                <img class="topic__icon" src="img/cat_eyes.png" alt=""/>
                <div class="topic__author">Eagles</div>
                <div class="topic__time">08.01.21</div>
                <div class="topic__teaser">
                    On a dark desert highway cool wind in my hair warm smell of colitas rising up through the air up
                    ahead in the distance I saw a shimmering light
                </div>
                <div class="topic__unread-wrapper"><p class="topic__unread-count">1</p></div>
            </li>
            <li class="sidebar__item topic highlighted">
                <img class="topic__icon" src="img/husky.png" alt=""/>
                <div class="topic__author">Mick</div>
                <div class="topic__time">11.01.21</div>
                <div class="topic__teaser">
                    I can't get no satisfaction, I can't get no satisfaction 'cause I try and I try and I try and I try
                    I can't get no, I can't get no
                </div>
                <div class="topic__unread-wrapper hidden"><p class="topic__unread-count">0</p></div>
            </li>
            <li class="sidebar__item topic">
                <img class="topic__icon" src="img/smile.png" alt=""/>
                <div class="topic__author">Ace</div>
                <div class="topic__time">09.01.21</div>
                <div class="topic__teaser">
                    You can do what you want just seize the day what you're doing tomorrow's gonna come your way don't
                    you ever consider giving up
                </div>
                <div class="topic__unread-wrapper hidden"><p class="topic__unread-count">0</p></div>
            </li>
        </ul>

    </div>`;
    }
}
