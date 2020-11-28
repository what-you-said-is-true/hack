import java.util.Scanner;
public class Usertext{
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        int id[]=new int[100000];//创建一个100000容量的Id数组,容纳用户输入的ID
        int sex[]=new int[100000];//sex的0和1分别代表男和女
        String name[]=new String[100000];//用户可以输入自己的姓名
        int temperature[]=new int[100000];//用户可以填报自己的实时体温
        int a=0;
        int overnum=sc.nextInt();
        if(overnum==1) {
            while (overnum != 0) {
                overnum = sc.nextInt();
                id[a] = sc.nextInt();
                sex[a] = sc.nextInt();
                name[a] = sc.nextLine();
                temperature[a] = sc.nextInt();
                a++;
            }
        }
        else{
            System.out.println("请输入正确的启动数字！");
        }//创建新用户前输入1，输入0时停止

        User user[]=new User[100000];
        for(int i=0;i<id.length;i++){
        user[i]=new User(id[i],sex[i],name[i],temperature[i]);
        }//将所有新用户放入用户数组中以便以后查找对应的账号密码
        user[0].setId(837592870);//随便做个测试：设置用户ID
        user[0].setTem(37);//填报用户体温
    }
}