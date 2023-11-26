---
title: "Quick Sort and Merge Sort, Explained"
description: "A quick explanation of quick sort and merge sort, two common sorting algorithms, and when and where you might actually use them."
date: 2023-11-23T02:00:00-06:00
image: "/images/posts/quick-sort-and-merge-sort-explained/pexels-pixabay-159045.jpg"
image_alt: "Photo by Pixabay: https://www.pexels.com/photo/gray-standard-color-book-near-green-eraser-159045/"
categories: ["tutorial"]
authors: ["Kaniel Kirby"]
tags: ["tutorial", "beginner", "algorithms", "sorting", "quick sort", "merge sort", "javascript", "typescript", "data structures"]
draft: false
---

Not every situation calls for the best "worst-case" time complexity. Sometimes, you want to implement a sorting algorithm that is fast in the average case, because your data is likely to be mostly sorted already. In this article, we'll look at two options: quick sort and merge sort.

## Table of Contents

- [Quick Sort](#quick-sort)
- [Merge Sort](#merge-sort)
- [Comparison](#comparison)
- [Conclusion](#conclusion)

## Quick Sort

Quick sort is a divide-and-conquer algorithm. It works by selecting a pivot element, and then partitioning the array into two subarrays: one with elements less than the pivot, and one with elements greater than the pivot. It then recursively sorts the subarrays.

I like to think of quick sort as the most logical step after learning Binary Search. Binary Search is a divide-and-conquer algorithm that works by dividing the array in half, and then recursively searching the half that contains the target element. Sounds familiar, right? This is because they both use the same base concepts: Recursion, and Divide and Conquer.

### Implementation

First, we need to implement a function that will partition the array. This function will take in the array, the low index, and the high index. It will return the index of the pivot element. This is where we'll implement the actual swapping (or sorting) of the array.

```typescript
function partition(array: number[], low: number, high: number): number {
  const pivot = array[high]; // Select the last element as the pivot
  let i = low - 1; // Index of smaller element (low is inclusive, high is exclusive)

  // Go through array until the second to last element (the pivot)
  for (let j = low; j < high; j++) {
    // if element is smaller than pivot, swap
    if (array[j] < pivot) {
      i++;
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Swap the pivot to its own correct position
  [array[i + 1], array[high]] = [array[high], array[i + 1]];

  return i + 1;
}
```

Next, we'll implement the actual quick sort function. This function will take in the array, the low index, and the high index. It will return the sorted array.

```typescript
function quickSort(array: number[], low: number, high: number): number[] {
  // If low is greater than or equal to high, we return the sorted subarray
  if (low < high) {
    const partitionIndex = partition(array, low, high);

    // Sort the two subarrays (left and right of the partition) recursively
    quickSort(array, low, partitionIndex - 1);
    quickSort(array, partitionIndex + 1, high);
  }

  return array;
}
```

### Time Complexity

Quick sort has a time complexity of `O(n log n)` in the average/best cases, and `O(n^2)` in the worst case. The worst case occurs when the pivot is the smallest or largest element in the array, and the array is already sorted. This is because the partition function will only move the pivot one element at a time, and will have to go through the entire array to do so.

All of this means that quick sort is great on smaller datasets, but not so great on larger datasets. This is because the worst case is more likely to occur on larger datasets.

TL;DR: Large datasets = Quick Sort good. Small datasets = Quick Sort bad.

## Merge Sort

Merge sort is another divide-and-conquer algorithm. It works by dividing the array into two subarrays, and then recursively sorting the subarrays. Once the subarrays are sorted, it merges them back together.

The key *difference* here from the previously explained Quick Sort is that Merge Sort does not sort the subarrays as it divides them. It only sorts them once they are fully divided. This is why Merge Sort is a *stable* sorting algorithm, and Quick Sort is not. This means it preserves the order of elements with the same value.

### Implementation

Merge sort has a bit more overhead in terms of implementation, but it doesn't stray too far from the concepts we've already covered. First, we need to implement a function that will merge the two subarrays back together. This function will take in the array, the low index, the middle index, and the high index. It will return the sorted array.

```typescript
function merge(array: number[], low: number, middle: number, high: number): number[] {
    // Find sizes of two subarrays to be merged (remember, low is inclusive, high is exclusive)
    let lowSize = middle - low + 1;
    let highSize = high - middle;
 
    // Create temp arrays
    let lowArray = new Array(lowSize); 
    let highArray = new Array(highSize);
 

    // Copy data to temp arrays
    for (let i = 0; i < lowSize; i++) {
      lowArray[i] = arr[low + i];
    }
    for (let j = 0; j < highSize; j++) {
      highArray[j] = arr[middle + 1 + j];
    }
 
    // Initial index of first subarray
    let i = 0;
 
    // Initial index of second subarray
    let j = 0;
 
    // Initial index of merged subarray
    let k = low;
 
    while (i < lowSize && j < highSize) {
        if (lowArray[i] <= highArray[j]) {
            arr[k] = lowArray[i];
            i++;
        }
        else {
            arr[k] = highArray[j];
            j++;
        }
        k++;
    }
 
    // Copy the remaining elements of
    // L[], if there are any
    while (i < lowSize) {
        arr[k] = lowArray[i];
        i++;
        k++;
    }
 
    // Copy the remaining elements of
    // R[], if there are any
    while (j < highSize) {
        arr[k] = highArray[j];
        j++;
        k++;
    }
}
```

Then we can implement the actual merge sort function. This function will take in the array, the low index, and the high index. It will return the sorted array.

```typescript
function mergeSort(array: number[], low: number, high: number): number[] {
  if (low >= high) {
    return;
  }
  // Find the middle index
  let middle = (high + low) / 2 + 1;

  // Sort the two subarrays (left and right of the middle) recursively
  mergeSort(array, low, middle);
  mergeSort(array, middle + 1, high);

  // Merge the two subarrays
  merge(array, low, middle, high);
}
```

### Time Complexity

Merge sort has a time complexity of `O(n log n)` in all cases. This is because it always divides the array in half, and then merges the subarrays back together in linear time. This makes it perfect for large datasets as well, but it also makes it a great choice for small datasets.

## Comparison

Now, at this point, you may be thinking, "Well, Merge Sort is better in all cases, so why would I ever use Quick Sort?" Well, they're still fundamentally different sorting algorithms. Let's dive in!

### Stability

Merge sort is a stable sorting algorithm, and Quick sort is not. This means that Merge sort preserves the order of elements with the same value, and Quick sort does not.

### Space Complexity

Merge sort has a space complexity of `O(n)`, while Quick sort has a space complexity of `O(log n)`. This is because Merge sort creates a new array for each subarray, while Quick sort sorts the subarrays in place.

### Time Complexity

Merge sort has a time complexity of `O(n log n)` in all cases, while Quick sort has a time complexity of `O(n log n)` in the average/best cases, and `O(n^2)` in the worst case. Quick sort, on the other hand, has to go through the entire array to move the pivot to its correct position in the worst case.

### Size

Let's get this out of the way. Quick Sort does not work well for large datasets. Merge Sort can work for either. 

### Space

Quick Sort has a space complexity of `O(log n)`, while Merge Sort has a space complexity of `O(n)`. This is because Merge Sort creates a new array for each subarray, while Quick Sort sorts the subarrays in place.

### Mutability

Quick Sort is a mutable sorting algorithm, while Merge Sort is not. This means that Quick Sort sorts the array in place, while Merge Sort creates a new array for each subarray.

### Data Structure

Quick Sort works best on arrays, while Merge Sort works best on linked lists.

## Conclusion

All of this is just to say, specifics matter when it comes to sorting. If you knew nothing about your dataset, sure, Merge Sort, easily. But what if your dataset is smaller? Or what if you can't waste memory on the new arrays Merge Sort creates? Or what if you need to sort a linked list? Or what if you need to sort an array in place? There's so many edge cases, and knowing these algorithms and where they play best is crucial to being a good developer.

With all that said, I hope this article helps, and I appreciate you reading!
