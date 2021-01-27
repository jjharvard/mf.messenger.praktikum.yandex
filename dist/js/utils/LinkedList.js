"use strict";
class Node2 {
    constructor(data) {
        this.data = data;
        this.next = null;
        this.prev = null;
    }
}
class LinkedList {
    constructor() {
        this.head = null;
    }
    insertAtEnd(data) {
        const node = new Node2(data);
        if (!this.head) {
            this.head = node;
        }
        else {
            const getLast = (node) => {
                return node.next ? getLast(node.next) : node;
            };
            const lastNode = getLast(this.head);
            node.prev = lastNode;
            lastNode.next = node;
        }
        return node;
    }
    insertInBegin(data) {
        const node = new Node2(data);
        if (!this.head) {
            this.head = new Node2(data);
        }
        else {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        }
        return node;
    }
    deleteNode(node) {
        if (!node.prev) {
            this.head = node.next;
        }
        else {
            const prevNode = node.prev;
            prevNode.next = node.next;
        }
    }
    search(comparator) {
        const checkNext = (node) => {
            if (comparator(node.data)) {
                return node;
            }
            return node.next ? checkNext(node.next) : null;
        };
        return this.head ? checkNext(this.head) : null;
    }
    traverse() {
        const array = [];
        if (!this.head) {
            return array;
        }
        const addToArray = (node) => {
            array.push(node.data);
            return node.next ? addToArray(node.next) : array;
        };
        return addToArray(this.head);
    }
    size() {
        return this.traverse().length;
    }
}
