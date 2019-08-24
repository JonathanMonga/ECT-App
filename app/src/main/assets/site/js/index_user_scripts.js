/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    
     /* button  #login_btn */
    
    
        /* button  #login_btn */
    
    
        /* button  #login_btn */
    
    
        /* button  #login_btn */
    
    
        /* button  #login_btn */
    $(document).on("click", "#login_btn", function(evt)
    {
         /*global activate_page */
         activate_page("#principal"); 
         activate_subpage("#accueil");
         return false;
    });
    
        /* button  #btn_menu_swip */
    
    
        /* button  #partenaires_btn */
    
    
        /* button  #btn_menu_swip */
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
