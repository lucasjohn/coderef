import java.io.*;
import java.util.*;
import java.text.*;
import java.math.*;
import java.util.regex.*;

public class Solution {

    static Node root;
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int n = in.nextInt();
        
        root = new Node();
        root.c = new Character('*');
        
        for(int a0 = 0; a0 < n; a0++){
            String op = in.next();
            String contact = in.next();
            
            if (op.equals("add")){
                root.insert(contact);
            } else if (op.equals("find")){
                int occurrences = root.find(contact);
                System.out.println(occurrences);
            }
        }
    }
    
    static class Node{
        Character c;
        Map<Character, Node> nodes = new HashMap<Character, Node>();
        
        int hmht = 0;

        public void insert(String partial){
            if (partial == null || partial.isEmpty())
                return;
            char[] array = partial.toCharArray();
            if (nodes.containsKey(array[0])){
                nodes.get(array[0]).hmht++;
                if (array.length > 1){
                    nodes.get(array[0]).insert(partial.substring(1));
                }
            } else {
                Node node = new Node();
                node.c = array[0];
                node.hmht = 1;
                node.insert(partial.substring(1));
                nodes.put(array[0],node);
            }
        }
        
        public int find(String contact){
            if (contact == null || contact.isEmpty())
                return -1;
            char[] array = contact.toCharArray();
            if (nodes.containsKey(array[0])){
                if (array.length == 1){
                    return nodes.get(array[0]).hmht;
                } else {
                    return nodes.get(array[0]).find(contact.substring(1));
                }
            } else {
                return 0;
            }
        }
        
    }
  
}
