namespace testAblauf;

public class User
{

    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;

    public List<Profile> Profiles { get; set; } = new();

    public User() { }

    public User(string name, string password)
    {
        Name = name;
        Password = password;
    }
}


public class Profile
{
    public int Id {get; set; }
    public string Name {get; set;} = string.Empty;
    public string ProfilePictureUrl {get; set;} = string.Empty;
    public int UserId {get; set;}

    public User? User {get; set;}
    public List<MyListItem> MyList {get; set;} = new();
}


public class MyListItem
{
    public int Id {get; set;}
    public int ProfileId {get; set;}

    public Profile? Profile {get; set;}

    public string Title {get; set;} = string.Empty;
    public string? ImageUrl {get; set;}
}
