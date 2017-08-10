boolean rootNode = false;
    Map<Integer,Integer> nodeCount = new HashMap<Integer,Integer>();
    boolean checkBST(Node root) {
        if (root == null){
            return false;
        }
        if (!rootNode){
            rootNode = true;
            loadCount(root);
        }
        return isBSTNode(root);
    }

    boolean isBSTNode(Node node){
        if(node == null){
            return true;
        }
        if (node.left != null && lessThanAny(node.left, node.data)){
            return false;
        }
        if (node.right != null && greaterThanAny(node.right, node.data)){
            return false;
        }
        if (nodeCount.get(node.data) > 1){
            return false;
        }
        return isBSTNode(node.left) && isBSTNode(node.right);
    }

    boolean lessThanAny(Node node, int value){
        if(node == null){
            return false;
        }
        if (value > node.data){
            return lessThanAny(node.left, value) || lessThanAny(node.right, value);
        } else {
            return true;
        }
    }

    boolean greaterThanAny(Node node, int value){
        if(node == null){
            return false;
        }
        if (value < node.data){
            return greaterThanAny(node.left, value) || greaterThanAny(node.right, value);
        } else {
            return true;
        }
    }

    void loadCount(Node root){
        if (root != null){
            if (nodeCount.containsKey(root.data)){
                int aux = nodeCount.get(root.data); 
                nodeCount.remove(root.data);
                nodeCount.put(root.data,++aux);
            } else {
                nodeCount.put(root.data,1);
            }
            loadCount(root.left);
            loadCount(root.right);
        }
    }
