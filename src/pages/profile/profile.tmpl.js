import common from '@/styles/common.module.scss'
import profile from "@/pages/profile/profile.module.scss";

export default `
<main class="${common.layout_notAuth}">
  <div class="${common.card}">
    <h2>Профиль</h2>
    <div class="${common.dFlex} ${common.mb1}">
      <img src="/avatar-default.png" alt="avatar" class="${common.avatar} ${common.aiC}">
      <div class="${profile.text}">
        <span>Костиков Михаил</span>
        <span class="${profile.text__login}">@kostikovmu</span>     
      </div>  
    </div>
    <a href="/?page=profile-edit">Изменить</a>
  </div>    
</main>
`
