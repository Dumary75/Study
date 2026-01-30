using System.Net.Http;
using Avalonia.Controls;

namespace WetterApp;

public partial class MainWindow : Window
{

        public readonly string  apiKey= "b5342b70c4e9dd024baafd6164f9f1ca";
        private readonly string apiRequest = "https://api.openweathermap.org/data/2.5/weather";

    public MainWindow()
    {
        InitializeComponent();

        HttpClient httpClient = new HttpClient();

        var city = "Reutlingen";
        var finalURL = apiRequest + "?q=" + city + "&appid=" + apiKey;

    }




}