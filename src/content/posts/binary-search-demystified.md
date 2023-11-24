---
title: "Binary Search Demystified"
description: "Here, I'll explain what binary search is, how it works, and show a basic example of it in TypeScript."
date: 2023-11-25T14:00:00Z
image: "/images/posts/binary-search-demystified/pexels-skitterphoto-63901.jpg"
image_alt: "Photo by Skitterphoto: https://www.pexels.com/photo/black-binocular-on-round-device-63901/"
categories: ["tutorial"]
authors: ["Kaniel Kirby"]
tags: ["tutorial", "beginner", "typescript", "javascript", "binary search", "divide and conquer", "data structures", "algorithms", "searching"]
draft: false
---

Binary search is a very common algorithm used in computer science, and it's one of the first ones you'll learn. It's also one of the most useful, and it's not too hard to understand. Let's get into it!

## What is Binary Search?

Binary search is a search algorithm that works on sorted data. It's a divide and conquer algorithm, meaning it splits the data into smaller and smaller pieces until it finds what it's looking for. It's very efficient, and it's used in a lot of places, like searching for a word in a dictionary, or finding a number in a sorted list.

## How does it work?

Binary search works by splitting the data in half, and checking if the value you're looking for is in the first half or the second half. If it's in the first half, it splits that half in half, and checks again. It keeps doing this until it finds the value it's looking for, or until it can't split the data anymore.

In simpler terms, it works like this:

1. You have a list of numbers, and you're looking for the number 5.
2. You split the list in half.
3. Is the number 5 bigger than, smaller than, or the same as the middle number in the list?
4. Bigger? Then we know none of the numbers in the first half of the list can be 5, because they're all smaller.
5. Smaller? Just the opposite, none of the numbers in the second half of the list can be 5, because they're all bigger.
6. We repeat this process of 2-5 until we find the number we're looking for, or until we can't split the list anymore.

## Implementation

Let's implement binary search in TypeScript! We'll start with a sorted array of numbers, and we'll write a function that takes in the array and the number we're looking for, and returns the index of that number in the array.

```typescript
const sortedArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // This array must be sorted.

// We take in the array and the target number.
function binarySearch(array: number[], target: number): number {
  let left = 0;
  let right = array.length;

  // When left is greater than right, we've searched the entire array.
  while (left < right) {
    // We find the middle index by adding left and right, and dividing by 2.
    const middle = Math.floor((left + right) / 2);

    // If the middle number is the target, we return the index.
    if (array[middle] === target) {
      return middle;
    }

    // If the middle number is less than the target, we know the target is in the right half of the array.
    if (array[middle] < target) {
      left = middle + 1;
    }

    // If the middle number is greater than the target, we know the target is in the left half of the array.
    if (array[middle] > target) {
      right = middle - 1;
    }
  }

  return -1;
}

console.log(binarySearch(sortedArray, 5)); // 4
```

## Complexity

Binary search is a very efficient algorithm, meaning it's fast. It's complexity is `O(log n)`, which means that it's time complexity grows logarithmically with the size of the input. This is very fast compared to linear search, as the data grows, which has a time complexity of `O(n)`, meaning it's time complexity grows linearly with the size of the input.

[![Big O Complexity Chart](/images/posts/binary-search-demystified/log2n-3001320127.gif)](https://en.wikipedia.org/wiki/Big_O_notation)
*Photo by [EQuestionAnswers](https://www.equestionanswers.com/c/c-binary-search.php)*

## Conclusion

Binary search is a very useful algorithm, and it's not too hard to understand. It's a divide and conquer algorithm, meaning it splits the data into smaller and smaller pieces until it finds what it's looking for. It's very efficient, and it's used in a lot of places.

If you're interested in learning more about some other divide and conquer algorithms, check out my article on [Quick Sort and Merge Sort, Explained](/quick-sort-and-merge-sort-explained/).
