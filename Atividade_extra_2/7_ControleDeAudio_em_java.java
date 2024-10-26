public class ControleDeAudio_em_java {
    public int volume;

    public controle_de_audio(){
        this.volume = 2;
    }

    public void aumentarVolume(){
        this.volume++;
    }

    public void diminuirVolume(){
        this.volume--;
    }

    public int lerVolume(){
        return this.volume;
    }

    public static void main(String[] args) {

        ControleDeAudio_em_java audio_naty = new controle_de_audio();

        audio_naty.aumentarVolume();
        System.out.println("volume atual: " + audio_naty.volume);

        audio_naty.diminuirVolume();
        System.out.println("volume atual: " + audio_naty.volume);
    }
}