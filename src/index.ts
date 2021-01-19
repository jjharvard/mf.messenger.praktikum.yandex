import {ChatListAdapter} from "./adapters/ChatListAdapter";
import {ChatListView} from "./adapters/ChatListView";
import {ViewGroup} from "./widgets/ViewGroup";

let root = document.getElementById('root');

class IndexPage extends ViewGroup {


    getTemplate(): string {
        return `<div>{{group}}</div>`;
    }

    getProps(): Object {
        return {};
    }

}

let indexPage = new IndexPage();

let listView = new ChatListView();
let adapter = new ChatListAdapter();
adapter.notifyDataSetChanged();
listView.setAdapter(adapter);

indexPage.addView(listView);

let inner = indexPage.render(indexPage);
console.log(inner);
root.innerHTML = inner;