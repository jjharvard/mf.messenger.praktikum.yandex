import { ChatItemView } from "./ChatItemView";
let data = {
    'messages': [
        `I can't get no satisfaction, I can't get no satisfaction 'cause I try and I try and I try and I try
                    I can't get no, I can't get no`,
        'hello',
        'How are you'
    ]
};
let result = '';
for (let prop of data['messages']) {
    let itemView = new ChatItemView();
    itemView.props = { 'message': prop };
    result += itemView.render() + '\n';
}
console.log(result);
