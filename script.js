const createNode = function (value, leftNode = null, rightNode = null) {
	return { value, leftNode, rightNode };
};

const createTree = function (array) {
	array = array
		.reduce((prev, curr) => {
			if (prev.includes(curr)) {
				return prev;
			} else {
				prev.push(curr);
				return prev;
			}
		}, [])
		.sort((a, b) => a - b);
	const start = 0;
	const end = array.length - 1;
	let root = buildTree(array, start, end);

	const getRoot = function () {
		return root;
	};

	const setRoot = function (newRoot) {
		root = newRoot;
	};

	const insert = function (value) {
		insertRecursively(root, value);
	};

	//recursive helper for insert
	const insertRecursively = function (root, value) {
		if (root === null) return createNode(value);

		if (root.value > value) {
			root.leftNode = insertRecursively(root.leftNode, value);
		} else {
			root.rightNode = insertRecursively(root.rightNode, value);
		}
		return root;
	};

	const deleteItem = function (value) {
		deleteItemRecursively(root, value);
	};

	//recursive helper for delete
	const deleteItemRecursively = function (root, value) {
		if (root === null) {
			console.log("could not find item to delete");
			return null;
		}
		if (root.value === value) {
			// if (root.leftNode === null && root.rightNode === null) return null;
			if (root.leftNode === null) return root.rightNode;
			if (root.rightNode === null) return root.leftNode;
			if (root.leftNode !== null && root.rightNode !== null) {
				root.value = findLeftestNode(root.rightNode);
				root.rightNode = deleteItemRecursively(root.rightNode, root.value);
				return root;
			}
		}

		if (root.value > value) {
			root.leftNode = deleteItemRecursively(root.leftNode, value);
		} else {
			root.rightNode = deleteItemRecursively(root.rightNode, value);
		}
		return root;
	};

	//recursive helper of the helper for delete xD
	const findLeftestNode = function (root) {
		if (root.leftNode === null) return root.value;
		return findLeftestNode(root.leftNode);
	};

	const find = function (value) {
		let iter = root;
		while (iter !== null) {
			if (iter.value === value) {
				return iter;
			} else if (iter.value > value) {
				iter = iter.leftNode;
			} else {
				iter = iter.rightNode;
			}
		}

		return null;
	};

	const levelOrder = function (callback, queue = [root]) {
		try {
			if (typeof callback !== "function") {
				throw new Error("This is not a function");
			}

			if (queue.length === 0) return;
			const node = queue.shift();
			callback(node);
			if (node.leftNode !== null) {
				queue.push(node.leftNode);
			}
			if (node.rightNode !== null) {
				queue.push(node.rightNode);
			}
			levelOrder(callback, queue);
		} catch (e) {
			console.log(e);
		}
	};

	const levelOrderIterative = function (callback) {
		const queue = [root];
		while (queue.length !== 0) {
			const node = queue.shift();
			callback(node);
			if (node.leftNode !== null) {
				queue.push(node.leftNode);
			}
			if (node.rightNode !== null) {
				queue.push(node.rightNode);
			}
		}
	};

	const inOrder = function (callback) {
		inOrderRecursive(callback, root);
	};

	const inOrderRecursive = function (callback, root) {
		if (root === null) return;
		inOrderRecursive(callback, root.leftNode);
		callback(root.value);
		inOrderRecursive(callback, root.rightNode);
	};

	const height = function (value) {
		const node = find(value);
		if (node === null) {
			return null;
		} else {
			return heightRecursive(value, node);
		}
	};

	const heightRecursive = function (value = null, root) {
		if (root === null) return -1;
		return 1 + Math.max(heightRecursive(value, root.leftNode), heightRecursive(value, root.rightNode));
	};

	const depth = function (value) {
		let iter = root;
		let counter = 0;
		while (iter !== null) {
			if (iter.value === value) {
				return counter;
			} else if (iter.value > value) {
				iter = iter.leftNode;
				counter++;
			} else {
				iter = iter.rightNode;
				counter++;
			}
		}

		return null;
	};

	const isBalanced = function () {
		if (root === null) return [-1, true];

		const arrLeft = isBalanced(root.leftNode);
		const arrRight = isBalanced(root.rightNode);
		const value1 = 1 + Math.max(arrLeft[0], arrRight[0]);
		const value2 = Math.abs(arrLeft[0] - arrRight[0]) <= 1 && arrLeft[1] && arrRight[1];

		return [value1, value2];
	};

	const rebalance = function () {
		const array = [];
		inOrder((element) => array.push(element));
		const start = 0;
		const end = array.length - 1;
		setRoot(buildTree(array, start, end));
	};

	return { getRoot, setRoot, insert, deleteItem, find, levelOrder, levelOrderIterative, inOrder, height, depth, isBalanced, rebalance };
};

//helper function to create tree
const buildTree = function (array, start, end) {
	if (start > end) return null;
	let mid = Math.floor((start + end) / 2);
	const root = createNode(array[mid]);
	root.leftNode = buildTree(array, start, mid - 1);
	root.rightNode = buildTree(array, mid + 1, end);
	return root;
};

const prettyPrint = (node, prefix = "", isLeft = true) => {
	if (node === null) {
		return;
	}
	if (node.rightNode !== null) {
		prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
	}
	console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
	if (node.leftNode !== null) {
		prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
	}
};

const tree = createTree([1, 7, 4, 10, 8, 89, 0, 2, 7]);

prettyPrint(tree.getRoot());

window.debug = { buildTree, prettyPrint, createTree };
