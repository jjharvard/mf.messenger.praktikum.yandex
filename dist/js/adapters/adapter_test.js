import { ChatListView } from "./ChatListView";
import { ChatListAdapter } from "./ChatListAdapter";
let chatList = new ChatListView([new ChatListAdapter()]);
let inner = chatList.render();
console.log(inner);
