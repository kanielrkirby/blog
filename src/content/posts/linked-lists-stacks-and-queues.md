---
title: "Linked Lists, Stacks, and Queues"
description: "Quick overview of linked lists, stacks, and queues, and how to implement them in JavaScript."
date: 2023-11-27T14:00:00Z
image: "/images/posts/linked-lists-stacks-and-queues/pexels-lukas-574071.jpg"
image_alt: "Photo by Lukas: https://www.pexels.com/photo/person-encoding-in-laptop-574071/"
categories: ["tutorial"]
authors: ["Kaniel Kirby"]
tags: ["tutorial", "beginner", "data structures", "javascript", "typescript", "linked lists", "stacks", "queues", "algorithms"]
draft: false
---

## Table of Contents

- [Linked Lists](#linked-lists)
- [Stacks](#stacks)
- [Queues](#queues)
- [Conclusion](#conclusion)

## Linked Lists

A linked list is a data structure that stores data in a linear fashion. It is a collection of nodes that are linked together. Each node contains a value and a pointer to the next node in the list. The first node in the list is called the head, and the last node is called the tail. The tail's pointer points to null, indicating that it is the end of the list.

[![](/images/posts/linked-lists-stacks-and-queues/linked-list.png)](https://wikipedia.org/wiki/Linked_list)

Linked lists are useful because they are dynamic. They can grow and shrink as needed. They are also easy to insert and delete from. However, they are not as efficient as arrays. Arrays are faster to access because they are stored in contiguous memory. Linked lists are stored in non-contiguous memory, so they are slower to access.

### Implementing a Linked List in TypeScript

First we need to create a class for the nodes in the list. Each node will have a value and a pointer to the next node in the list.

```typescript
class Node {
  value: any;
  next: Node | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}
```

Next we need to create a class for the list itself. It will have a head and a tail. The head will be the first node in the list, and the tail will be the last node in the list. We will also have a length property to keep track of the number of nodes in the list.

```typescript
class LinkedList {
  head: Node | null;
  tail: Node | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}
```

Finally, we can implement some methods for the list. We'll need a way to add and remove nodes from the list. The other methods may or may not be necessary depending on the use case.

```typescript
class LinkedList {
  // ...

  // Add a node to the end of the list O(1)
  push(value: any): LinkedList {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }

    this.length++;

    return this;
  }

  // Remove the last node from the list O(n)
  pop(): Node | null {
    if (!this.head) return null;

    let current = this.head;
    let newTail = current;

    while (current.next) {
      newTail = current;
      current = current.next;
    }

    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }

    return current;
  }

  // Remove the first node from the list O(1)
  shift(): Node | null {
    if (!this.head) return null;

    const current = this.head;
    this.head = current.next;
    this.length--;

    if (this.length === 0) {
      this.tail = null;
    }

    return current;
  }

  // Add a node to the beginning of the list O(1)
  unshift(value: any): LinkedList {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.length++;

    return this;
  }

  // Get the node at the given index O(n)
  get(index: number): Node | null {
    if (index < 0 || index >= this.length) return null;

    let current = this.head;

    for (let i = 0; i < index; i++) {
      current = current!.next;
    }

    return current;
  }

  // Set the value of the node at the given index O(n)
  set(index: number, value: any): boolean {
    const node = this.get(index);

    if (!node) return false;

    node.value = value;

    return true;
  }

  // Insert a node at the given index O(n)
  insert(index: number, value: any): boolean {
    if (index < 0 || index > this.length)
      return false;

    if (index === 0) {
      this.unshift(value);
      return true;
    }

    if (index === this.length) {
      this.push(value);
      return true;
    }

    const node = new Node(value);
    const prev = this.get(index - 1);
    const temp = prev!.next;

    prev!.next = node;
    node.next = temp;

    this.length++;

    return true;
  }

  // Remove the node at the given index O(n)
  remove(index: number): Node | null {
    if (index < 0 || index >= this.length) return null;

    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();

    const prev = this.get(index - 1);
    const removed = prev!.next;

    prev!.next = removed!.next;
    this.length--;

    return removed;
  }

}
```

## Stacks

A stack is a data structure that stores in a last-in-first-out (LIFO) manner. It typically implements the Linked List data structure. It has two main operations: push and pop. Push adds an item to the top of the stack, and pop removes an item from the top of the stack.

[![](/images/posts/linked-lists-stacks-and-queues/stack.png)](https://wikipedia.org/wiki/Stack_(abstract_data_type))

Stacks are useful for keeping track of the order of operations. For example, a calculator uses a stack to keep track of the order of operations. It also uses a stack to keep track of the numbers that have been entered.

### Implementing a Stack in TypeScript

We'll need that same Node class from the Linked List implementation.

```typescript
class Node {
  value: any;
  next: Node | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}
```

Next we need to create a class for the stack itself. It will have a head and a tail. The head will be the first node in the stack, and the tail will be the last node in the stack. We will also have a length property to keep track of the number of nodes in the stack.

```typescript
class Stack {
  head: Node | null;
  tail: Node | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
}
```

Finally, we can implement some methods for the stack. Now that we have a specific use case, we know exactly what methods we'll need.

```typescript
class Stack {
  // ...

  // Add a node to the top of the stack O(1)
  push(value: any): Stack {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      this.head = node;
    }

    this.length++;

    return this;
  }

  // Remove the node from the top of the stack O(1)
  pop(): Node | null {
    if (!this.head) return null;

    const current = this.head;
    this.head = current.next;
    this.length--;

    if (this.length === 0) {
      this.tail = null;
    }

    return current;
  }

  // Get the node at the top of the stack O(1)
  peek(): Node | null {
    return this.head;
  }

}
```

## Queues

A queue is a data structure that stores in a first-in-first-out (FIFO) manner. It's exactly the opposite of a stack.

[![](/images/posts/linked-lists-stacks-and-queues/queue.png)](https://wikipedia.org/wiki/Queue_(abstract_data_type))

Queues are useful for keeping track of the order of operations. For example, a line at a store, or a line of cars at a drive-thru.

### Implementing a Queue in TypeScript

You're probably starting to see a pattern now, so we'll speed through this one.

```typescript
class Node {
  value: any;
  next: Node | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  head: Node | null;
  tail: Node | null;
  length: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // Add a node to the end of the queue O(1)
  enqueue(value: any): Queue {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail!.next = node;
      this.tail = node;
    }

    this.length++;

    return this;
  }

  // Remove the node from the beginning of the queue O(1)
  dequeue(): Node | null {
    if (!this.head) return null;

    const current = this.head;
    this.head = current.next;
    this.length--;

    if (this.length === 0) {
      this.tail = null;
    }

    return current;
  }
}
```

The main difference here is that we're adding to the end of the list instead of the beginning. 

## Conclusion

There's a couple main things that you should take away from this.

### Linked Lists make up the foundation of many other data structures.

That goes for many data structures or patterns, like binary trees, hash tables, graphs, etc. They are the building blocks of many other data structures, even if you won't find yourself using a Linked List by itself very often.

### Knowing your requirements is important.

When you have a specific use case, you can create a data structure that is optimized for that use case. For example, both the Stack's and the Queue's methods are O(1) instead of O(n). That's because we know exactly what methods we'll need, so we can optimize the data structure for those methods.

### Learn in chunks.

When I was first starting out, I would jump from something like binary trees to recursion, without getting the chance to understand where they're used, and what they're used for. Leetcode can sometimes encourage this behavior. If I were to offer some advice, look through a course's syllabus, or find curated lists for Leetcode. The point is to associate related information together. It will help you understand the bigger picture.

With that said, I hope you learned something from this post. If you have any questions, feel free to reach out to me on [LinkedIn](https://www.linkedin.com/in/kanielkirby/). Thanks for reading!
