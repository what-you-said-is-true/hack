import java.util.Scanner;
public class User{
    public int ID;
    public int sex;
    public String name;
    public int temperature;
    public User(int ID,int sex,String name,int temperature){
        this.ID=ID;
        this.sex=sex;
        this.name=name;
        this.temperature=temperature;
    }
    public void setID(int id){
        this.ID=id;
    }
    public int getID(){
        System.out.println(ID);
    }
    public void setTem(int tem){
        this.temperature=tem;
    }
    public int getTem(){
        System.out.println(temperature);
    }
}