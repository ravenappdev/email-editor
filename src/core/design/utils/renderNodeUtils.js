export const renderNodeUtils = ({ isSelected, src, query: { node, parseFreshNode }, actions }) => {
    return {
        moveUp: () => {
            if (!isSelected) return;
            let trg = src.data.parent;
            let childrenArray = trg ? node(trg).descendants(false, "childNodes") : [];
            let index = childrenArray.indexOf(src.id);

            if (index - 1 < 0) {
                // let grandParent = node(parent).get().data.parent;
                // if (!grandParent || !node(grandParent).isCanvas()) {
                //     return;
                // }
                // console.log(node(grandParent).isCanvas());
                // childrenArray = node(grandParent).descendants(false,'childNodes');
                // index = childrenArray.indexOf(parent);
                // actions.move(id, grandParent, index);
                return;
            } else {
                actions.move(src.id, trg, index - 1);
            }
        },
        moveDown: () => {
            if (!isSelected) return;

            let trg = src.data.parent;
            let childrenArray = trg ? node(trg).descendants(false, "childNodes") : [];
            let index = childrenArray.indexOf(src.id);
            if (index + 1 >= childrenArray.length) {
                // let grandParent = node(parent).get().data.parent;
                // if (!grandParent || !node(grandParent).isCanvas()) {
                //     return;
                // }
                // console.log(node(grandParent).isCanvas());
                // childrenArray = node(grandParent).descendants(false,'childNodes');
                // index = childrenArray.indexOf(parent);
                // actions.move(id, grandParent, index + 1);
                return;
            } else {
                actions.move(src.id, trg, index + 2);
            }
        },
        addNode: ({ newNode, trg, isDown, isCanvas }) => {
            if (!newNode) return;

            let childrenArray = trg ? node(trg).descendants(false, "childNodes") : [];
            let index = childrenArray.indexOf(src.id);
            let tmp = parseFreshNode({
                data: { type: newNode, isCanvas: Boolean(isCanvas) }
            }).toNode();
            actions.add(tmp, trg, index + isDown);
        },

        duplicateNode: () => {
            let trg = src.data.parent;
            let childrenArray = trg ? node(trg).descendants(false, "childNodes") : [];
            let index = childrenArray.indexOf(src.id);

            const srcNode = node(src.id).toNodeTree();
            const srcTreeCopy = { rootNodeId: "", nodes: {} };

            const copyTree = curId => {
                if (!curId) {
                    throw new Error(`Node with id ${curId} not Found`);
                }
                const childNodes = srcNode.nodes[curId].data.nodes;
                const linkedNodes = srcNode.nodes[curId].data.linkedNodes;
                let freshNode = { data: { ...srcNode.nodes[curId].data } };
                freshNode.data.nodes = [];
                freshNode.data.linkedNodes = {};

                childNodes.map(val => {
                    const freshChild = copyTree(val);
                    freshNode.data.nodes.push(freshChild.id);
                });

                Object.entries(linkedNodes).map(([key, val]) => {
                    const freshChild = copyTree(val);
                    freshNode.data.linkedNodes[key] = freshChild.id;
                });
                freshNode = parseFreshNode(freshNode).toNode();
                if (curId === srcNode.rootNodeId) srcTreeCopy.rootNodeId = freshNode.id;
                srcTreeCopy.nodes[freshNode.id] = freshNode;

                freshNode.data.nodes.map(id => {
                    srcTreeCopy.nodes[id].data.parent = freshNode.id;
                });

                Object.entries(freshNode.data.linkedNodes).map(([, val]) => {
                    srcTreeCopy.nodes[val].data.parent = freshNode.id;
                });

                return freshNode;
            };

            copyTree(srcNode.rootNodeId);

            actions.addNodeTree(srcTreeCopy, trg, index + 1);
        }
    };
};
