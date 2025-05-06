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
	const root = buildTree(array, start, end);

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

	const deleteItem = function (value) {};

	//recursive helper for delete
	const deleteItemRecursively = function (root, value) {
		if (root.value === value) {
			if (root.leftNode === null && root.rightNode === null) return null;
			if (root.leftNode === null) return root.rightNode;
			if (root.rightNode === null) return root.leftNode;
		}

		if (root.value > value) {
			root.leftNode = deleteItemRecursively(root.leftNode, value);
		} else {
			root.rightNode = deleteItemRecursively(root.rightNode, value);
		}
		return node;
	};

	return { root, insert };
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

const tree = createTree([1, 7, 4]);
tree.insert(10);
tree.insert(8);
tree.insert(89);
tree.insert(0);
tree.insert(2);
tree.insert(7);

prettyPrint(tree.root);

window.debug = { buildTree, prettyPrint, createTree };
