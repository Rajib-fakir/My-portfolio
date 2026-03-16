
import plugin from './plugin.json';
import './style.css';

class AcodePlugin {

  async init(){

    const btn=document.createElement("button");
    btn.innerText="Android Preview";
    btn.style.position="fixed";
    btn.style.bottom="20px";
    btn.style.right="20px";
    btn.style.zIndex="9999";
    btn.style.padding="10px";
    btn.style.background="#1e88e5";
    btn.style.color="#fff";
    btn.style.border="none";
    btn.style.borderRadius="4px";
    btn.style.cursor="pointer";

    btn.onclick=()=>{
      const editor=editorManager.editor;
      const xml=editor.getValue();
      localStorage.setItem("layoutXML", xml);
      window.open(this.baseUrl + "preview.html");
    };

    document.body.appendChild(btn);
    this.previewBtn=btn;
  }

  async destroy(){
    if(this.previewBtn){ this.previewBtn.remove(); }
  }

}

if(window.acode){
  const acodePlugin=new AcodePlugin();
  acode.setPluginInit(plugin.id,async(baseUrl)=>{
    if(!baseUrl.endsWith("/")) baseUrl+="/";
    acodePlugin.baseUrl=baseUrl;
    await acodePlugin.init();
  });
  acode.setPluginUnmount(plugin.id,()=>{ acodePlugin.destroy(); });
}
