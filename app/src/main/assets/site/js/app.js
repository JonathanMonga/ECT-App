//var mainUrl="http://localhost/root/ong_fondation_alphonse/main.php";
var mainUrl="http://www.fondation-munokokasumba.org/apps/main_ujana.php";
 var id_dest_msg;
$(document).ready(function(data) 
{
	if(localStorage.getItem("id_us") && localStorage.getItem("id_us")!="")
	{
		 activate_page("#principal"); 
		 activate_subpage("#accueil"); 
		 privilege(localStorage.getItem("priv"));
	}
	initialisation();
}); 
function w3_popup(e,contenu,e3)
{
 	
 	if(e=="loading")
 	{
 		$("#w3-popup-detail")
 		.html("<div class='center fs-12 pt-2'><img src='images/ajax-rond.gif' /> chargement en cours...</div>");
 	}else if(e=="info")
 	{
 		$("#w3-popup-detail")
 		.html("<div class='center fs-12 pt-2'>"+contenu+"</div>"+
 				'<div class="right pr-1 pt-1 pb-1"><button class="w3-btn w3-small w3-round" onclick="w3_popup_close()">OK</button></div>'
 			);  
 	}else if (e=="envoi_message2") 
 	{
 		//alert(contenu);
 		$("#w3-popup-detail")
 		.html("<div class='center fs-12 p-05'>Répondre à : "+e3+"</div>"+
 			'<div class="p-1">'+
 				'<label class="item item-input widget uib_w_19 d-margins" data-uib="ionic/input" data-ver="0">'+
					'<textarea placeholder="Votre message" id="id_envoi_msg_popup" required></textarea>'+
                '</label>'+
                '<div class="right"><button class="w3-btn green w3-medium mt-1 white-text w3-round" onclick="envoi_msg_popup('+"'"+contenu+"'"+","+"'"+$("#id_envoi_msg_popup").val()+"'"+');">Répondre</button>&nbsp;&nbsp;<button class="w3-btn  w3-medium mt-1 grey-text w3-round" onclick="w3_popup_close();">Annuler</button></div>'+
            '</div>');
 	}else
 	{
 		$("#w3-popup-detail")
 		.html("<div class='center fs-12 p-05'>"+contenu+"</div>");
 	}
 	$("#w3popup").fadeIn();  
}
function w3_popup_close()
{
 	$("#w3popup").fadeOut(); 
}
function connexion()
{
	$("#w3-popupconnexion-detail").html("<div class='center bold pt-1'><img src='images/ajax-rond.gif' /> connexion en cours...</div>");
	$("#w3popupconnexion").show(); 
	$.ajax({
		url:mainUrl,
		type:"GET",
		data:{"ent":"connexion","login":$("#connexion_login").val(),"mdp":$("#connexion_mdp").val()},
		error:function(data)
		{
			$("#w3-popupconnexion-detail")
			.html("<div class='center bold pt-1'>Pas de connexion au serveur</div>"+
				'<div class="right p-1"><button class="w3-btn" onclick="$('+"'"+"#w3popupconnexion"+"'"+').hide()">ok</button></div>');

			$("#w3popupconnexion").show();
		},
		success:function(data)
		{
            
			$("#w3popupconnexion").hide(); 
			if(data["n"]==0)
			{
				$("#w3-popupconnexion-detail")
				.html("<div class='center bold pt-1'>Pas d'accès au système</div>"+
				'<div class="right p-1"><button class="w3-btn" onclick="$('+"'"+"#w3popupconnexion"+"'"+').hide()">ok</button></div>');	
				$("#w3popupconnexion").show();	
			}else
			{
				localStorage.setItem("id_us",data["id"]);
				localStorage.setItem("priv",data["priv"]);
				activate_page("#principal"); 
				activate_subpage("#accueil");
				privilege(localStorage.getItem("priv"));

			}
		},
	});
}
function privilege(priv)
{
	$menu_btn_actu=$("#menu-btn-actu");
	$menu_btn_communique=$("#menu-btn-communique");
	$menu_btn_membre=$("#menu-btn-membre");
	$menu_btn_departement=$("#menu-btn-departement");
	$menu_btn_action=$("#menu-btn-action");
	$menu_btn_partenaire=$("#menu-btn-partenaire");
	$menu_btn_finance=$("#menu-btn-finance");
	$menu_btn_admin=$("#menu-btn-admin");
	
	$admin_btn_actu=$("#admin-btn-actu");
	$admin_btn_communique=$("#admin-btn-communique");
	$admin_btn_membre=$("#admin-btn-membre");
	$admin_btn_action=$("#admin-btn-action");
	$admin_btn_materiel=$("#admin-btn-materiel");
	$admin_btn_partenaire=$("#admin-btn-partenaire");
	$admin_btn_user=$("#admin-btn-user");
	$admin_btn_depart=$("#admin-btn-depart");
	$admin_btn_finance_entree=$("#admin-btn-finance_entree");
	$admin_btn_finance_depense=$("#admin-btn-finance-depense");

	$menu_btn_actu.hide();
	$menu_btn_communique.hide();
	$menu_btn_membre.hide();
	$menu_btn_departement.hide();
	$menu_btn_action.hide();
	$menu_btn_partenaire.hide();
	$menu_btn_finance.hide();
	$menu_btn_admin.hide();

	
	$admin_btn_actu.hide();
	$admin_btn_action.hide();
	$admin_btn_membre.hide();
	$admin_btn_materiel.hide();
	$admin_btn_depart.hide();
	$admin_btn_user.hide();
	$admin_btn_communique.hide();
	$admin_btn_partenaire.hide();
	$admin_btn_finance_entree.hide();
	$admin_btn_finance_depense.hide();

	$menu_btn_actu.show();
	$menu_btn_communique.show();
	$menu_btn_departement.show();
	$menu_btn_action.show();

	$menu_btn_admin.show();

	switch(priv)
	{
		case "sec_ad":
			$menu_btn_membre.show();
			$menu_btn_communique.show();
			$menu_btn_action.show();
			$menu_btn_departement.show();
			$menu_btn_admin.show();
			
			$admin_btn_actu.show();
			$admin_btn_action.hide();
			$admin_btn_membre.show();
			$admin_btn_materiel.show();
			$admin_btn_depart.hide();
			$admin_btn_user.hide();
			$admin_btn_communique.show();
			$admin_btn_partenaire.hide();
			$admin_btn_finance_entree.hide();
			$admin_btn_finance_depense.hide();
		break;
		case "social":
			$menu_btn_membre.show();
			$menu_btn_communique.show();
			$menu_btn_action.show();
			$menu_btn_departement.show();
			$menu_btn_admin.show();
			
			$admin_btn_actu.hide();
			$admin_btn_action.show();
			$admin_btn_membre.hide();
			$admin_btn_materiel.hide();
			$admin_btn_depart.hide();
			$admin_btn_user.hide();
			$admin_btn_communique.hide();
			$admin_btn_partenaire.hide();
			$admin_btn_finance_entree.hide();
			$admin_btn_finance_depense.hide();
		break;
		case "membre":
			$menu_btn_membre.hide();
			$menu_btn_communique.show();
			$menu_btn_action.show();
			$menu_btn_departement.show();
			$menu_btn_admin.hide();
			
			$admin_btn_actu.hide();
			$admin_btn_action.hide();
			$admin_btn_membre.hide();
			$admin_btn_materiel.hide();
			$admin_btn_depart.hide();
			$admin_btn_user.hide();
			$admin_btn_communique.hide();
			$admin_btn_partenaire.hide();
			$admin_btn_finance_entree.hide();
			$admin_btn_finance_depense.hide();
		break;
		case "finan":
			$menu_btn_membre.show();
			$menu_btn_communique.show();
			$menu_btn_action.show();
			$menu_btn_departement.show();
			$menu_btn_finance.show();
			$menu_btn_admin.show();
			
			$admin_btn_actu.hide();
			$admin_btn_action.hide();
			$admin_btn_membre.hide();
			$admin_btn_materiel.hide();
			$admin_btn_depart.hide();
			$admin_btn_user.hide();
			$admin_btn_communique.hide();
			$admin_btn_partenaire.hide();
			$admin_btn_finance_entree.show();
			$admin_btn_finance_depense.show();
		break;
		case "coord":
			$menu_btn_actu.show();
			$menu_btn_communique.show();
			$menu_btn_membre.show();
			$menu_btn_departement.show();
			$menu_btn_action.show();
			$menu_btn_partenaire.show();
			$menu_btn_finance.show();
			$menu_btn_admin.show();

			$admin_btn_actu.show();
			$admin_btn_action.show();
			$admin_btn_membre.show();
			$admin_btn_materiel.show();
			$admin_btn_depart.hide();
			$admin_btn_user.hide();
			$admin_btn_communique.show();
			$admin_btn_partenaire.show();
			$admin_btn_finance_entree.show();
			$admin_btn_finance_depense.show();
		break;
		case "admin":
			$menu_btn_actu.show();
			$menu_btn_communique.show();
			$menu_btn_membre.show();
			$menu_btn_departement.show();
			$menu_btn_action.show();
			$menu_btn_partenaire.show();
			$menu_btn_finance.show();
			$menu_btn_admin.show();
			
			$admin_btn_actu.show();
			$admin_btn_action.show();
			$admin_btn_membre.show();
			$admin_btn_materiel.show();
			$admin_btn_depart.show();
			$admin_btn_user.show();
			$admin_btn_communique.show();
			$admin_btn_partenaire.show();
			$admin_btn_finance_entree.show();
			$admin_btn_finance_depense.show();
		break;
		default:
			$menu_btn_admin.hide();
		break;
	}
}
function initialisation()
{
	if(localStorage.getItem("id_us") && localStorage.getItem("id_us")!="")
	{
		$.ajax({
			url:mainUrl,
			type:"GET",
			data:{"ent":"init","id_us":localStorage.getItem("id_us")},
			error:function(data)
			{
				$("#notif_msg").html("...").addClass("w3-red w3-text-white rondre p-05 fs-07");
			},
			success:function(data)
			{
				//popup_info(data);
				$r=data;
				
				$msg=$r['msg'];
				$rdv=$r['notif'];
				$anniversaire=$r['anniversaire'];

				
				$("#badge-msg").text($msg);
				$("#badge-rdv").text($rdv);
				$("#badge-anniversaire").text($anniversaire);
				
				if($msg==0)
				{
					$("#badge-msg").hide();
				}else
				{
					$("#badge-msg").show();
					$("#badge-msg").text($msg);					
				}
				if($rdv==0)
				{
					$("#badge-rdv").hide();
				}else
				{
					$("#badge-rdv").show();
					$("#badge-rdv").text($rdv);					
				}
				if($anniversaire==0)
				{
					$("#badge-anniversaire").hide();
				}else
				{
					$("#badge-anniversaire").show();
					$("#badge-anniversaire").text($anniversaire);					
				}
			},
		});
	}else
	{
		
	}
	setTimeout(initialisation,1600);
}
function deconnexion()
{
	localStorage.clear();
	activate_page("#mainpage");
}
function requete_det(e)
{

 	var r; 
 	switch(e)
 	{
 		case "finance":
 			(requete("liste_membres",""));
 		break;
 	}
 	
}
function requete(ent,arg)
{

	var chaine;
	var r;
	if(arg=="")
	{
		chaine='"ent"'+ ":"+"'"+ ent+"'";
	}else
	{
		chaine='"ent"'+ ":"+"'"+ ent+"'";
		
	}
	$.ajax({
			url:"http://localhost/root/ong_fondation_alphonse/main.php",
			type:"GET",
			data:{"ent":"liste_membres"},
			error:function(data){
				r="error";
			},
			success:function(data)
			{
				r=JSON.parse(data);
				alert(data);
			},

		});
}
function finances_select()
{
	var contenu ='Finances <hr /><button class="w3-btn blue w3-round-large white-text" onclick="ouvrir('+"'"+"finances_entree_page"+"'"+')">Entrées</button> &nbsp&nbsp<button class="w3-btn blue w3-round-large white-text" onclick="ouvrir('+"'"+"finances_depense_page"+"'"+')">Dépenses</button>';
	w3_popup("",contenu);
}
function entrees()
{
	w3_popup("loading");
	$.ajax({
		url:mainUrl,
		type:"GET",
		data:{"ent":"entrees","dt1":$("#entr_dt1").val(),"dt2":$("#entr_dt2").val()},
		error:function(data)
		{
			w3_popup_close(); 
			w3_popup("info","<b>Pas de connexion au serveur</b>");
		},
		success:function(data)
		{
			
			w3_popup_close();
			var r=data;
			if(r["n"]==0)
			{
				$('#finances_entrees_detail').html("<div><i class='ion ion-times'></i> Aucune entrée à cette période</div>");
			}else
			{
				$('#finances_entrees_detail')
				.html("<div class='grey lighten-2 fs-12 p-1 card w3-round-large mb-05'>USD : "+r["usd"]+
						"<br />CDF : "+r["cdf"]+
					"</div>");
				
				for(var a=0;a<r["ligne"].length;a++)
				{
					//alert(r["ligne"][a]["dt"]);
					$('#finances_entrees_detail')
					.append('<div class="w3-card w3-round-large mb-05 p-1 clearfix">'+
								'<div class="fs-1">'+r["ligne"][a]["dt"]+'</div>'+
								'<div class="center">'+" "+r["ligne"][a]["montant"]+" "+r["ligne"][a]["monnaie"]+'</div>'+
							'</div>');
				}
			}
		}
	});
}
function depenses()
{
	w3_popup("loading");
	$.ajax({
		url:mainUrl,
		type:"GET",
		data:{"ent":"depenses","dt1":$("#depense_dt1").val(),"dt2":$("#depense_dt2").val()},
		error:function(data)
		{
			w3_popup_close(); 
			w3_popup("info","<b>Pas de connexion au serveur</b>");
		},
		success:function(data)
		{
			w3_popup_close();
			var r=data;
			if(r["n"]==0)
			{
				$('#finances_depenses_detail').html("<div><i class='ion ion-times'></i> Aucune entrée à cette période</div>");
			}else
			{
				$('#finances_depenses_detail')
				.html("<div class='grey lighten-2 fs-12 p-1 card w3-round-large mb-05'>USD : "+r["usd"]+
						"<br />CDF : "+r["cdf"]+
					"</div>");
				
				for(var a=0;a<r["ligne"].length;a++)
				{
					//alert(r["ligne"][a]["dt"]);
					$('#finances_depenses_detail')
					.append('<div class="card w3-round-large mb-05 p-1 clearfix">'+
								'<div class="fs-1">'+r["ligne"][a]["dt"]+'</div>'+
								'<div class="center">'+" "+r["ligne"][a]["montant"]+" "+r["ligne"][a]["monnaie"]+'</div>'+
								'<div class="fs-1 right">'+r["ligne"][a]["user"]['nom']+'</div>'+
							'</div>');
				}
			}
		}
	});
}
function envoi_msg()
{
	w3_popup("loading");
	$.ajax({
		url:mainUrl,
		type:"GET",
		data:{"ent":"insert_msg","id_us":localStorage.getItem('id_us'),"contenu_msg":$("#contenu_envoi_msg").val(),"destinataire":$("#destinataire_envoi_msg").val()},
		error:function(data){w3_popup_close();w3_popup("info","Pas de connexion au serveur")},
		success:function(data)
		{
			$("#envoi_msg_popup").val("");
			w3_popup_close();
			if(data[0]==1)
			{
				$("#contenu_envoi_msg").val("");
				w3_popup("info","Message bien envoyé");
			}else
			{
				w3_popup("info","Echec d'envoi");
			}
		},
	});
}
function envoi_msg_popup()
{
	w3_popup_close();
	w3_popup("loading");
	$.ajax({
		url:mainUrl,
		type:"GET",
		data:{"ent":"insert_msg","id_us":localStorage.getItem('id_us'),"contenu_msg":$("#id_envoi_msg_popup").val(),"destinataire":$("#reponse_msg_dest_id").val()},
		error:function(data){w3_popup_close();w3_popup("info","Pas de connexion au serveur")},
		success:function(data)
		{
			$("#envoi_msg_popup").val("");
			w3_popup_close();
			if(data[0]==1)
			{
				$("#reponse_msg_dest").val("");
				w3_popup("info","Message bien envoyé");
			}else
			{
				w3_popup("info","Echec d'envoi");
			}
		},
	});
}
function boite_msg()
{
	activate_subpage("#boite_message");
	msg_recu(localStorage.getItem('id_us'));
	msg_envoye();

}
function msg_recu(id)
{
	$("#liste_msg_ent").html("chargement en cours...");
	id=localStorage.getItem("id_us");
	$.ajax({
		url:mainUrl,
		type:"GET",
		data:{"ent":"msg_entrant","id_us":id}, 
		error:function(data){
			
		},
		success:function(data)
		{
			var r=(data);
			if(r[0]["n"]==0)
			{
				$("#liste_msg_ent").html("<div class='text-danger'>Vous n'avez aucun message recu</div>");
				//$("#liste_msg_ent").html("").removeClass("w3-card");
			}else
			{
				$("#liste_msg_ent").html("").removeClass("w3-card");
				for(a=0;a<r.length;a++)
				{	var ligne="ligne"+r[a]["id"];
					if(r[a]['statut']=="N")
					{
						$("#liste_msg_ent")
						.append("<div class='w3-card w3-round mb-05 p-05 w3-text-gray fw-500' id='"+ligne+"'>"+
							"<div class='bold'><small><i class='glyphicon glyphicon-time'></i> "+r[a]["dt"]+" &nbsp;&nbsp;"+r[a]["heure"]+"</small></div>"+
							"<div class='fs-1 bold'><i class='ion ion-person'></i> "+r[a]["expeditaire"]+"</div>"+
							"<div class='bold'><i class='fa fa-comment'></i> "+r[a]["contenu"]+"</div>"+
							"<div class='w3-border-top mt-05'>"+
								'<a class="w3-btn w3-small w3-text-pink" onclick="w3_popup('+"'"+"info"+"'"+","+"'"+r[a]['contenu_detail']+"'"+'); msg_lu('+"'"+r[a]["id"]+"'"+')">'+
									'<i class="fa fa-share"></i> Lire&nbsp;'+
								"</a>"+
								'<a class="w3-btn w3-small w3-text-pink" onclick="ouvrir('+"'"+'reponse_msg'+"'"+","+"'"+r[a]['id_expeditaire']+"'"+","+"'"+r[a]["expeditaire"]+"'"+');">'+
									"<i class='fa fa-pencil'></i> Repondre"+
								"</a>"+
								'<a class="w3-btn w3-small blue-text" onclick="del('+"'"+"msg_entrant"+"'"+","+"'"+""+"'"+","+"'"+r[a]["id"]+"'"+","+"'"+""+"'"+');">'+
									"<i class='fa fa-trash'></i> Supprimer"+
								"</a>"+
							"</div>"+      
						"</div>"); 
					}else
					{
						$("#liste_msg_ent").append("<div class='w3-round mb-05 p-05 w3-card' id='"+ligne+"'>"+
							"<div><small><i class='glyphicon glyphicon-time'></i> "+r[a]["dt"]+" &nbsp;&nbsp;"+r[a]["heure"]+"</small></div>"+
							"<div class='fs-1'><i class='ion ion-person'></i> "+r[a]["expeditaire"]+"</div>"+
							"<div><i class='fa fa-comment'></i> "+r[a]["contenu"]+"</div>"+
							"<div class='w3-border-top mt-05'>"+
								'<a class="w3-btn w3-small blue-text" onclick="w3_popup('+"'"+"info"+"'"+","+"'"+r[a]['contenu_detail']+"'"+')">'+
									'<i class="fa fa-share"></i> Lire&nbsp;'+
								"</a>"+
								'<a class="w3-btn w3-small blue-text" onclick="ouvrir('+"'"+'reponse_msg'+"'"+","+"'"+r[a]['id_expeditaire']+"'"+","+"'"+r[a]["expeditaire"]+"'"+');">'+
									"<i class='fa fa-pencil'></i> Repondre"+
								"</a>"+
								'<a class="w3-btn w3-small blue-text" onclick="del('+"'"+"msg_entrant"+"'"+","+"'"+""+"'"+","+"'"+r[a]["id"]+"'"+","+"'"+""+"'"+');">'+
									"<i class='fa fa-trash'></i> Supprimer"+
								"</a>"+
							"</div>"+
						"</div>");
					}
				}
				$("#liste_msg_ent").addClass("mb-3");
			}
		},
	});
}
function msg_envoye()
{
	$("#liste_msg_sort").html("<div><img src='images/ajax-rond.gif'>&nbsp;Chargement en cours...</div>");
	$.ajax({
		url:mainUrl,
		type:"GET",
		data:{"ent":"msg_envoye","id_us":localStorage.getItem("id_us")},
		error:function(data){
			
		},
		success:function(data)
		{
			var r=(data);
			if(r[0]["n"]==0)
			{
				$("#liste_msg_sort").html("Aucun message envoyé");
			}else
			{
				$("#liste_msg_sort").html("").removeClass("w3-card");
				for(a=0;a<r.length;a++)
				{
					var ligne="ligne"+r[a]["id"];
					$("#liste_msg_sort")
					.append("<div class='w3-card w3-round mb-05 p-05 w3-text-gray fw-500' id='"+ligne+"'>"+
						"<div class='right'><small><i class='ion ion-calendar'></i> "+r[a]["dt"]+" &nbsp;&nbsp;"+r[a]["heure"]+"</small></div>"+
						"<div class='fs-1'><i class='ion ion-person'></i> "+r[a]["destinateur"]+"</div>"+
						"<div class='fs-1'><i class='fa fa-comment'></i> "+r[a]["contenu"]+"</div>"+
						"<div class='right'>"+
							/*'<a class="w3-btn w3-small blue-text" onclick="popup_info('+"'"+r[a]['msg_entier']+"'"+'); msg_lu('+"'"+r[a]["idmsg"]+"'"+')">'+
								'<i class="fa fa-share"></i> Lire&nbsp;'+
							"</a>"+
							'<a class="w3-btn w3-small blue-text" onclick="popup('+"'"+'envoi_message2'+"'"+'); idEt='+"'"+r[a]['idexpeditaire']+"'"+';">'+
								"<i class='fa fa-pencil'></i> Renvoyé"+
							"</a>"+*/
							'<a class="w3-btn w3-small blue-text" onclick="del('+"'"+"msg_sortant"+"'"+","+"'"+""+"'"+","+"'"+r[a]["id"]+"'"+","+"'"+""+"'"+');">'+
								"<i class='fa fa-trash'></i> Supprimer"+
							"</a>"+
						"</div>"+
					"</div>"); 
				}
				$("#liste_msg_sort").addClass("mb-3");
			}
		},
	});	
}
function msg_lu(idmsg)
{
	$.ajax({
		url:mainUrl,
		type:"GET",
		data:{"ent":"msg_lu","idmsg":idmsg},
		success:function(data)
		{
			//alert(idmsg);
			msg_recu(localStorage.getItem("id"));
		},
	});
}

function boite_rdv()
{
	activate_subpage("#boite_rdv");
	rdv_aujourdhui();
	rdv_demain();
	//msg_envoye();
}
function rdv_aujourdhui()
{
	$.ajax({
		url:mainUrl,
		type:"GET",
		data:{"ent":"rdv_aujourdhui","id_us":localStorage.getItem("id_us")},
		success:function(data)
		{
			if(data[0]["n"]==0)
			{
				$("#liste_rdv_aujourdhui")
				.html("Aucun rendez-vous pour aujourd'hui");
			}else
			{
				$("#liste_rdv_aujourdhui")
				.html("");

				for(var a=0;a<data.length;a++)
				{
					$("#liste_rdv_aujourdhui")
					.append("<div class='w3-border-bottom p-05 mb-02'>"+
							"<div class='ion ion-calendar'> Heure : "+data[a]["heure"]+"</div>"+
							"<div class='bold fs-12'><i class='ion ion-person'></i> Démandeur : "+data[a]["demandeur"]+"</div>"+
							"<div>Motif : "+data[a]["motif"]+"</div>"+
							"<div>Observation : "+data[a]["observation"]+"</div>"+
						"</div>")
				}
			}
		}
	});
}
function rdv_demain()
{
	$.ajax({
		url:mainUrl,
		type:"GET",
		data:{"ent":"rdv_demain","id_us":localStorage.getItem("id_us")},
		success:function(data)
		{
			if(data[0]["n"]==0)
			{
				$("#liste_rdv_demain")
				.html("Aucun rendez-vous pour demain");
			}else
			{
				$("#liste_rdv_demain")
				.html("");

				for(var a=0;a<data.length;a++)
				{
					$("#liste_rdv_demain")
					.append("<div class='w3-border-bottom p-05 mb-02'>"+
							"<div class='ion ion-calendar'> Heure : "+data[a]["heure"]+"</div>"+
							"<div class='bold fs-12'><i class='ion ion-person'></i> Démandeur : "+data[a]["demandeur"]+"</div>"+
							"<div>Motif : "+data[a]["motif"]+"</div>"+
							"<div>Observation : "+data[a]["observation"]+"</div>"+
						"</div>")
				}
			}
		}
	});
}
function rdv_date()
{
	$.ajax({
		url:mainUrl,
		type:"GET",
		data:{"ent":"rdv_date","dt1":$("#rdv_dt1").val(),"dt2":$("#rdv_dt2").val(),"id_us":localStorage.getItem("id_us")},
		success:function(data)
		{
			if(data[0]["n"]==0)
			{
				$("#resultat_rdv_date")
				.html("Aucun rendez-vous à cette période");
			}else
			{
				$("#resultat_rdv_date")
				.html("");

				for(var a=0;a<data.length;a++)
				{
					$("#resultat_rdv_date")
					.append("<div class='w3-border-bottom p-05 mb-02'>"+
							"<div class='ion ion-calendar'> Heure : "+data[a]["heure"]+"</div>"+
							"<div class='bold fs-12'><i class='ion ion-person'></i> Démandeur : "+data[a]["demandeur"]+"</div>"+
							"<div>Motif : "+data[a]["motif"]+"</div>"+
							"<div>Observation : "+data[a]["observation"]+"</div>"+
						"</div>")
				}
			}
		}
	});
}
function anniversaire()
{
	activate_subpage("#anniversaire");
	$("#anniversaire_avenir")
	.html("Chargement en cours...");
	$("#anniversaire_aujourdhui")
	.html("Chargement en cours...");
	 anniversaire_jour();
	 anniversaire_avenir();
}
function anniversaire_jour()
{
	$.ajax({
			url:mainUrl,
			type:"GET",
			data:{"ent":"anniversaire_jour"},
			error:function(data){
				w3_popup_close();
				w3_popup("info","Echec de connexion au serveur");
			},
			success:function(data) 
			{
				w3_popup_close();
				var r=data;
				if(r[0]["n"]==0)
				{
					$("#anniversaire_aujourdhui")
					.html("Aucun anniversaire");
				}else 
				{  
					$("#anniversaire_aujourdhui")
					.html("");
					for(var a=0;a<r[0]["n"];a++)  
					{ 
						$("#anniversaire_aujourdhui")
						.append("<div class='pb-1 w3-border-bottom pt-1 w3-card fs-12 w3-round mb-1 p-05'>"+
									"<div class=' fs-15 bold center'><i class='ion ion-person'></i> "+r[a]["nom"]+"</div><hr />"+ 
									'<div>'+r[a]["profession"]+'</div>'+
									'<div>'+r[a]["profession"]+'</div>'+
									'<div>'+r[a]["telephone"]+'</div>'+
									'<div>'+r[a]["qualite"]+'</div>'+
								"</div>");           
					} 
				}
					//w3_popup_close(); 
			}

		});
}
function anniversaire_avenir()
{
	$.ajax({
			url:mainUrl,
			type:"GET",
			data:{"ent":"anniversaire_avenir"},
			error:function(data){
				w3_popup_close();
				w3_popup("info","Echec de connexion au serveur");
			},
			success:function(data) 
			{
				w3_popup_close();
				var r=data;
				if(r[0]["n"]==0)
				{
					$("#anniversaire_avenir")
					.html("Aucun trouvé trouvé");
				}else 
				{  
					$("#anniversaire_avenir")
					.html("");
					for(var a=0;a<r[0]["n"];a++)  
					{ 
						$("#anniversaire_avenir")
						.append("<div class='mb-1 p-05'>"+
								r[a]["dt_naiss"]+
								"</div>"+
								"<div class='pb-1 w3-border-bottom pt-1 w3-card fs-12 w3-round mb-1 p-05'>"+
									"<div class=' fs-15 bold center'><i class='ion ion-person'></i> "+r[a]["nom"]+"</div><hr />"+ 
									'<div>'+r[a]["profession"]+'</div>'+
									'<div>'+r[a]["profession"]+'</div>'+
									'<div>'+r[a]["telephone"]+'</div>'+
									'<div>'+r[a]["qualite"]+'</div>'+
								"</div>");           
					} 
				}
					//w3_popup_close(); 
			}

		});
}
function ouvrir(page,e1,e2,e3)
{
    activate_page("#principal"); 
    switch(page)
    {
        case "accueil":
            activate_subpage("#accueil");
        case "membres":
            activate_subpage("#membres_page"); 
            w3_popup("loading");
            $.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"liste_membres"},
				error:function(data){
					w3_popup_close();
					w3_popup("info","Echec de connexion au serveur");
				},
				success:function(data) 
				{
					w3_popup_close();
					var r=data;
					if(r[0]["n"]==0)
					{
						w3_popup("info","Aucune donnée trouvée"); 
					}else 
					{  
						$("#membres_detail")
						.html("");
						for(var a=0;a<r[0]["n"];a++)  
						{ 
							$("#membres_detail")
							.append("<div class='pb-1 w3-border-bottom pt-1 w3-card fs-12 w3-round mb-1 p-05'>"+
										"<div class=' fs-15 bold center'><i class='ion ion-person'></i> "+r[a]["nom"]+"</div><hr />"+ 
										'<div>'+r[a]["profession"]+'</div>'+
										'<div>'+r[a]["qualite"]+'</div>'+
										
									"</div>");           
						} 
					}
					//w3_popup_close(); 
				}

			});
            break;
    	case "departements":
            activate_subpage("#departements_page"); 
            //w3_popup("loading");
            $.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"liste_departements"},
				error:function(data){
					w3_popup_close();
					w3_popup("info","Echec de connexion au serveur");
				},
				success:function(data) 
				{
					var r=data;
					if(r[0]["n"]==0)
					{
						w3_popup("info","Aucune donnée trouvée"); 
					}else 
					{  
						$("#departements_detail")
						.html("");
						for(var a=0;a<r[0]["n"];a++)  
						{ 
							$("#departements_detail")
							.append("<div class='pb-1 w3-border-bottom fs-1 w3-card w3-round p-05 mt-05'>"+
										"<div class=' fs-15 bold center'>"+r[a]["nom"]+"</div>"+ 
										'<div><i class="ion ion-person"></i> '+r[a]["responsable"]+'</div>'+
										'<div>Tél : '+r[a]["telephone"]+"  &nbsp;&nbsp;E-mail : "+r[a]["e_mail"]+'</div>'+
									"</div>");           
						} 
					}
					//w3_popup_close(); 
				}

			});
            break;
    	case "partenaires":
            activate_subpage("#partenaires_page"); 
            //w3_popup("loading");
            $.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"liste_partenaires"},
				error:function(data){
					w3_popup_close();
					w3_popup("info","Echec de connexion au serveur");
				},
				success:function(data) 
				{
					var r=data;
					if(r[0]["n"]==0)
					{
						w3_popup("info","Aucune donnée trouvée"); 
					}else 
					{  
						$("#partenaires_detail")
						.html("");
						for(var a=0;a<r[0]["n"];a++)  
						{ 
							$("#partenaires_detail")
							.append("<div class='mt-05 pb-1 w3-border w3-border-blue pt-1 w3-card p-05 w3-round fs-1'>"+
										"<div class='w3-bold fs-15 center blue-text w3-border-bottom w3-border-blue mb-05 pb-02'>"+r[a]["nom"]+"</div>"+
										'<div>Type activité : '+r[a]["activite"]+'</div>'+
										'<div>Ville : '+r[a]["ville"]+'</div>'+
										'<div>Adresse : '+r[a]["activite"]+'</div>'+
										'<div>Site web : '+r[a]["site_web"]+'</div>'+
										'<div>Tél : '+r[a]["telephone"]+"  &nbsp;&nbsp;/  E-mail : "+r[a]["e_mail"]+'</div>'+
										'<div>Observartion : '+r[a]["observation"]+'</div>'+
									"</div>");           
						} 
					}
					//w3_popup_close(); 
				}

			});
            break;
        case "actions":
            activate_subpage("#actions_page"); 
             w3_popup("loading");
            $.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"liste_actions"},
				error:function(data){
					w3_popup_close();
					w3_popup("info","Echec de connexion au serveur");
				},
				success:function(data) 
				{
					var r=data;
					if(r[0]["n"]==0)
					{
						w3_popup_close();
						w3_popup("info","Aucune donnée trouvée"); 
					}else 
					{  
						w3_popup_close();
						$("#actions_detail")
						.html("");
						for(var a=0;a<r[0]["n"];a++)  
						{ 
							$("#actions_detail")
							.append("<div class='w3-bold fs-12 center bold indigo white-text p-05 w3-round'>"+r[a]["type_activite"]+" "+r[a]["periode"]+"</div>"+
									"<div class='mt-05 pb-1 fs-1 w3-border-bottom pt-1 w3-card p-05 w3-round mb-1'>"+
										'<div>Bénéficiaire : '+r[a]["beneficiaire"]+'</div>'+
										'<div>Type activité : '+r[a]["type_activite"]+'</div>'+
										'<div>Lieu : '+r[a]["lieu"]+'</div>'+
										'<div>Adresse : '+r[a]["adresse"]+'</div>'+
										'<div>Téléphone : '+r[a]["telephone"]+'</div>'+
										'<div>Nature don : '+r[a]["nature_don"]+'</div>'+
										'<div>Tél : '+r[a]["telephone"]+'</div>'+
										'<div>Observartion : '+r[a]["observation"]+'</div>'+ 
									"</div>");           
						} 
					}
					//w3_popup_close(); 
				}

			});
            break;
        case "actualites":
            activate_subpage("#actualites_page"); 
            w3_popup("loading");
            $.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"liste_actualites"},
				error:function(data){
					w3_popup_close();
					w3_popup("info","Echec de connexion au serveur");
				},
				success:function(data) 
				{
					w3_popup_close();
					var r=data;
					if(r[0]["n"]==0)
					{
						w3_popup("info","Aucune donnée trouvée"); 
					}else 
					{  
						//alert(data);
						$("#actualites_detail")
						.html("");
						for(var a=0;a<r[0]["n"];a++)  
						{ 
							$("#actualites_detail")
							.append("<div class='pb-1 w3-card w3-round p-1 mb-05 clearfix'>"+
										"<div class='fs-07'>"+
											"<span class='left'><i class='ion ion-calendar'></i> "+r[a]["dt_diff"]+"</span>"+
											"<span class='right'> Par : "+r[a]["user"]["nom"]+"</span>"+
										"</div>"+ 
										"<div class=' fs-12 bold mb-05 orange-text center U'>"+r[a]["titre"]+"</div>"+ 
										'<div class="fs-1">'+r[a]["detail"]+'</div>'+
										'<div class="right pr-2">'+
											'<button class="w3-round-xxlarge w3-blue w3-btn w3-small">Lire</button>'+
										'</div>'+
									"</div>");           
						} 
					}
					//w3_popup_close(); 
				}

			});
            break;
        case "communiques":
            activate_subpage("#communiques_page"); 
            w3_popup("loading");
            $.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"liste_communiques"},
				error:function(data){
					w3_popup_close();
					w3_popup("info","Echec de connexion au serveur");
				},
				success:function(data) 
				{
					w3_popup_close();
					var r=data;
					if(r[0]["n"]==0)
					{
						w3_popup("info","Aucune donnée trouvée"); 
					}else 
					{  
						//alert(data);
						$("#communiques_detail")
						.html("");
						for(var a=0;a<r[0]["n"];a++)  
						{ 
							$("#communiques_detail")
							.append("<div class='pb-1 w3-border p-1 mb-05 clearfix'>"+
										"<div class='fs-07'>"+
											"<span class='left'><i class='ion ion-calendar'></i> "+r[a]["dt_diff"]+"</span>"+
											"<span class='right'> Par : "+r[a]["user"]["nom"]+"</span>"+
										"</div>"+ 
										"<div class=' fs-12 bold mb-05 red-text center w3-borders w3-round-xxlarge mt-1'>"+r[a]["titre"]+"</div>"+ 
										'<div class="fs-1">'+r[a]["detail"]+'</div>'+
									"</div>");           
						} 
					}
					//w3_popup_close(); 
				}

			});
        	break;
        case "finances_entree_page":
        	w3_popup_close();
        	activate_subpage("#finances_entree_page");	
        	break;
        case "finances_depense_page":
        	w3_popup_close();
        	activate_subpage("#finances_depense_page");	
        	break;
        case "admin":
            activate_subpage("#admin"); 
        break;
        case "msg_nouveau":
        	activate_subpage("#envoi_message");
        	$.ajax({
        		url:mainUrl,
        		type:"GET",
        		data:{"ent":"user_liste","id_exclu":localStorage.getItem('id_us')},
        		success:function(data)
        		{
        			if(data[0]["n"]==0)
        			{

        			}else
        			{
        				$("#destinataire_envoi_msg")
        				.html('<option value=""></option>');
        				
        				for(var a=0;a<data.length;a++)
        				{
        					$("#destinataire_envoi_msg")
        					.append('<option value="'+data[a]['id']+'">'+data[a]["nom"]+'</option>');
        				}
        			}
        		}
        	})
        break;
        case "reponse_msg":
        	activate_subpage("#reponse_message");
        	$("#reponse_msg_dest").text(e2);
        	$("#reponse_msg_dest_id").val(e1);
        break;
        case "rdv_nouveau":
        	activate_subpage("#rdv_nouveau");
        break;
    }
}
function ajout(e)
{
	switch(e)
	{
		case "membre":
			$("#w3-popup-detail")
 			.html("<div class='center pt-2 bold'>Voulez-vous vraiment enregistrer ?</div><hr />"+
 					'<div class="center fs-12 pb-05"><button class="w3-btn" onclick="ajout('+"'"+"membre_conf"+"'"+');">Oui</button>&nbsp&nbsp<button class="w3-btn" onclick="w3_popup_close();">Non</button></div>');	
		break;
		case "membre_conf":
			w3_popup("loading");
			$nom=$("#membre_nom").val();
			$sexe=$("#membre_sexe").val();
			$telephone=$("#membre_telephone").val();
			$datenaiss=$("#membre_datenaiss").val();
			$adresse=$("#membre_adresse").val();
			$profession=$("#membre_profession").val();
			$email=$("#membre_email").val();
			$qualite=$("#membre_qualite").val();
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"ajout","e":"membre","nom":$nom,"sexe":$sexe,"telephone":$telephone,"adresse":$adresse,"datenaiss":$datenaiss,"profession":$profession,"email":$email,"qualite":$qualite},
				error:function(data){w3_popup_close();w3_popup('info',"Pas de connexion au serveur");},
				success:function(data)
				{
					w3_popup_close();
					var r=data;
					if(r["n"]==0)
					{
						w3_popup("info","<div class='bold fs-12'><i class='ion ion-close'></i>  Echec d'enregistrement</div>")
					}else
					{
						w3_popup("info","<div class='bold fs-12'><i class='ion ion-android-checkmark'></i> Bien enregistré</div>");
						$("#membre_nom").val("");
						$("#membre_sexe").val();
						$("#membre_telephone").val("");
						$("#membre_datenaiss").val("");
						$("#membre_adresse").val("");
						$("#membre_profession").val("");
						$("#membre_email").val("");
						$("#membre_qualite").val();
						//activate_subpage("#membres_nouveau");
					}
				},
			});
		break;
		case "communique":
			$("#w3-popup-detail")
 			.html("<div class='center pt-2 bold'>Voulez-vous vraiment enregistrer ?</div><hr />"+
 					'<div class="center fs-12 pb-05"><button class="w3-btn" onclick="ajout('+"'"+"communique_conf"+"'"+');">Oui</button>&nbsp&nbsp<button class="w3-btn" onclick="w3_popup_close();">Non</button></div>');	
		break;
		case "communique_conf":
			w3_popup("loading");
			$titre=$("#communique_titre").val();
			$detail=$("#communique_detail").val();
			$datediff=$("#communique_datediff").val();
			$heure=$("#communique_heurediff").val();
			
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"ajout","e":"communique","titre":$titre,"detail":$detail,"datediff":$datediff,"heure":$heure,"id_us":localStorage.getItem('id_us')},
				error:function(data){w3_popup_close();w3_popup('info',"Pas de connexion au serveur");},
				success:function(data)
				{
					w3_popup_close();
					var r=data;
					if(r["n"]==0)
					{
						w3_popup("info","<div class='bold fs-12'><i class='ion ion-close'></i>  Echec d'enregistrement</div>")
					}else
					{
						w3_popup("info","<div class='bold fs-12'><i class='ion ion-android-checkmark'></i> Bien enregistré</div>")
						$("#communique_titre").val("");
						$("#communique_detail").val("");
						$("#communique_datediff").val("");
						$("#communique_heurediff").val("");
					}
				},
			});
		break;
		case "actualite":
			$("#w3-popup-detail")
 			.html("<div class='center pt-2 bold'>Voulez-vous vraiment enregistrer ?</div><hr />"+
 					'<div class="center fs-12 pb-05"><button class="w3-btn" onclick="ajout('+"'"+"actualite_conf"+"'"+');">Oui</button>&nbsp&nbsp<button class="w3-btn" onclick="w3_popup_close();">Non</button></div>');	
		break;
		case "actualite_conf":
			w3_popup("loading");
			$titre=$("#actualite_titre").val();
			$detail=$("#actualite_detail").val();
			$datediff=$("#actualite_datediff").val();
			$heure=$("#actualite_heurediff").val(); 			
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"ajout","e":"actualite","titre":$titre,"detail":$detail,"datediff":$datediff,"heure":$heure,"id_us":localStorage.getItem('id_us')},
				error:function(data){w3_popup_close();w3_popup('info',"Pas de connexion au serveur");},
				success:function(data)
				{
					w3_popup_close();
					var r=data;
					if(r["n"]==0)
					{
						w3_popup("info","<div class='bold fs-12'><i class='ion ion-close'></i>  Echec d'enregistrement</div>")
					}else
					{
						w3_popup("info","<div class='bold fs-12'><i class='ion ion-android-checkmark'></i> Bien enregistré</div>")
						$("#actualite_titre").val("");
						$("#actualite_detail").val("");
						$("#actualite_datediff").val("");
						$("#actualite_heurediff").val("");
					}
				},
			});
		break;
		case "action":
			$("#w3-popup-detail")
 			.html("<div class='center pt-2 bold'>Voulez-vous vraiment enregistrer ?</div><hr />"+
 					'<div class="center fs-12 pb-05"><button class="w3-btn" onclick="ajout('+"'"+"action_conf"+"'"+');">Oui</button>&nbsp&nbsp<button class="w3-btn" onclick="w3_popup_close();">Non</button></div>');	
		break;
		case "action_conf": 
			w3_popup("loading");
			$action_dt=$("#action_dt").val();
			$action_dt2=$("#action_dt2").val();
			$action_heure=$("#action_heure").val();
			$action_lieu=$("#action_lieu").val();
			$action_adresse=$("#action_adresse").val(); 
			$action_telephone=$("#action_telephone").val(); 
			$action_type_activite=$("#action_type_activite").val(); 
			$action_nature_don=$("#action_nature_don").val(); 
			$action_beneficiaire=$("#action_beneficiaire").val(); 
			$action_observation=$("#action_observation").val(); 			
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"ajout",
					"e":"action",
					"dt":$action_dt,
					"dt2":$action_dt2,
					"heure":$action_heure,
					"lieu":$action_lieu,
					"adresse":$action_adresse,
					"telephone":$action_telephone,
					"type_activite":$action_type_activite,
					"nature_don":$action_nature_don,
					"beneficiaire":$action_beneficiaire,
					"observation":$action_observation,
					"id_us":localStorage.getItem('id_us')
				},
				error:function(data){w3_popup_close();w3_popup('info',"Pas de connexion au serveur");},
				success:function(data)
				{
					w3_popup_close();
					var r=data;
					if(r["n"]==0)
					{
						w3_popup("info","<div class='bold fs-12'><i class='ion ion-close'></i>  Echec d'enregistrement</div>")
					}else
					{
						w3_popup("info","<div class='bold fs-12'><i class='ion ion-android-checkmark'></i> Bien enregistré</div>")
						$("#action_dt").val("");
						$("#action_dt2").val("");
						$("#action_heure").val("");
						$("#action_lieu").val("");
						$("#action_adresse").val(""); 
						$("#action_telephone").val(""); 
						$("#action_type_activite").val(""); 
						$("#action_nature_don").val(""); 
						$("#action_beneficiaire").val(""); 
						$("#action_observation").val("");
					}
				},
			});
		break;
		case "partenaire":
			$("#w3-popup-detail")
 			.html("<div class='center pt-2 bold'>Voulez-vous vraiment enregistrer ?</div><hr />"+
 					'<div class="center fs-12 pb-05"><button class="w3-btn" onclick="ajout('+"'"+"partenaire_conf"+"'"+');">Oui</button>&nbsp&nbsp<button class="w3-btn" onclick="w3_popup_close();">Non</button></div>');	
		break;
		case "partenaire_conf": 
			w3_popup("loading");
			$nom=$("#partenaire_nom").val();
			$activite=$("#partenaire_activite").val();
			$ville=$("#partenaire_ville").val();
			$adresse=$("#partenaire_adresse").val(); 
			$telephone=$("#partenaire_telephone").val(); 
			$site_web=$("#partenaire_site_web").val(); 
			$email=$("#partenaire_email").val(); 
			$observation=$("#partenaire_observation").val(); 			
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"ajout",
					"e":"partenaire",
					"nom":$nom,
					"activite":$activite,
					"ville":$ville,
					"adresse":$adresse,
					"telephone":$telephone,
					"site_web":$site_web,
					"email":$email,
					"observation":$observation
				},
				error:function(data){w3_popup_close();w3_popup('info',"Pas de connexion au serveur");},
				success:function(data)
				{
					w3_popup_close();
					var r=data;
					if(r["n"]==0)
					{
						w3_popup("info","<div class='bold fs-12'><i class='ion ion-close'></i>  Echec d'enregistrement</div>")
					}else
					{
						w3_popup("info","<div class='bold fs-12'><i class='ion ion-android-checkmark'></i> Bien enregistré</div>")
						$("#partenaire_nom").val("");
						$("#partenaire_activite").val("");
						$("#partenaire_ville").val("");
						$("#partenaire_adresse").val(""); 
						$("#partenaire_telephone").val(""); 
						$("#partenaire_site_web").val(""); 
						$("#partenaire_email").val(""); 
						$("#partenaire_observation").val(""); 
					}
				},
			});
		break;
		case "finance_entree":
			$("#w3-popup-detail")
 			.html("<div class='center pt-2 bold'>Voulez-vous vraiment enregistrer ?</div><hr />"+
 					'<div class="center fs-12 pb-05"><button class="w3-btn" onclick="ajout('+"'"+"finance_entree_conf"+"'"+');">Oui</button>&nbsp&nbsp<button class="w3-btn" onclick="w3_popup_close();">Non</button></div>');	
		break;
		case "finance_entree_conf":
			w3_popup("loading");
			$dt=$("#finance_entree_dt").val();
			$montant=$("#finance_entree_montant").val();
			$monnaie=$("#finace_entree_monnaie").val();			
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"ajout","e":"finance_entree","dt":$dt,"montant":$montant,"monnaie":$monnaie,"id_us":localStorage.getItem('id_us')},
				error:function(data){w3_popup_close();w3_popup('info',"Pas de connexion au serveur");},
				success:function(data)
				{
					w3_popup_close();
					var r=data;
					if(r["n"]==0)
					{
						w3_popup("info","<div class='bold fs-12'><i class='ion ion-close'></i>  Echec d'enregistrement</div>")
					}else
					{
						w3_popup("info","<div class='bold fs-12'><i class='ion ion-android-checkmark'></i> Bien enregistré</div>")
						$dt=$("#finance_entree_dt").val("");
						$montant=$("#finance_entree_montant").val("");
						$monnaie=$("#finace_entree_monnaie").val("");	
					}
				},
			});
		break;
		case "finance_depense":
			$("#w3-popup-detail")
 			.html("<div class='center pt-2 bold'>Voulez-vous vraiment enregistrer ?</div><hr />"+
 					'<div class="center fs-12 pb-05"><button class="w3-btn" onclick="ajout('+"'"+"finance_depense_conf"+"'"+');">Oui</button>&nbsp&nbsp<button class="w3-btn" onclick="w3_popup_close();">Non</button></div>');	
		break;
		case "finance_depense_conf":
			w3_popup("loading");
			$dt=$("#finance_depense_dt").val();
			$montant=$("#finance_depense_montant").val();
			$monnaie=$("#finance_depense_monnaie").val();	
			$motif=$("#finance_depense_motif").val();			
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"ajout","e":"finance_depense","dt":$dt,"montant":$montant,"monnaie":$monnaie,"motif":$motif,"id_us":localStorage.getItem('id_us')},
				error:function(data){w3_popup_close();w3_popup('info',"Pas de connexion au serveur");},
				success:function(data)
				{
					w3_popup_close();
					var r=data;
					if(r["n"]==0)
					{
						w3_popup("info","<div class='bold fs-12'><i class='ion ion-close'></i>  Echec d'enregistrement</div>")
					}else
					{
						w3_popup("info","<div class='bold fs-12'><i class='ion ion-android-checkmark'></i> Bien enregistré</div>")
						$("#finance_depense_dt").val("");
						$("#finance_depense_montant").val("");
						$("#finace_depense_monnaie").val("");
						$("#finace_depense_motif").val("");	
					}
				},
			});
		break;
		case "departement":
			$("#w3-popup-detail")
 			.html("<div class='center pt-2 bold'>Voulez-vous vraiment enregistrer ?</div><hr />"+
 					'<div class="center fs-12 pb-05"><button class="w3-btn" onclick="ajout('+"'"+"departement_conf"+"'"+');">Oui</button>&nbsp&nbsp<button class="w3-btn" onclick="w3_popup_close();">Non</button></div>');	
		break;
		case "departement_conf":
			w3_popup("loading"); 
			$nom=$("#departement_nom").val();
			$responsable=$("#departement_responsable").val();
			$telephone=$("#departement_telephone").val();	
			$email=$("#departement_email").val();			
			$.ajax({
				url:mainUrl,   
				type:"GET",
				data:{"ent":"ajout","e":"departement","nom":$nom,"responsable":$responsable,"telephone":$telephone,"email":$email},
				error:function(data){w3_popup_close();w3_popup('info',"Pas de connexion au serveur");},
				success:function(data)
				{
					w3_popup_close();
					var r=data;
					if(r["n"]==0)
					{
						w3_popup("info","<div class='bold fs-12'><i class='ion ion-close'></i>  Echec d'enregistrement</div>")
					}else
					{
						w3_popup("info","<div class='bold fs-12'><i class='ion ion-android-checkmark'></i> Bien enregistré</div>")
						$("#departement_nom").val("");
						$("#departement_responsable").val("");
						$("#departement_telephone").val("");	
						$("#departement_email").val("");
					}
				},
			});
		break;
		case "rdv":
			$("#w3-popup-detail")
 			.html("<div class='center pt-2 bold'>Voulez-vous vraiment enregistrer ?</div><hr />"+
 					'<div class="center fs-12 pb-05"><button class="w3-btn" onclick="ajout('+"'"+"rdv_conf"+"'"+');">Oui</button>&nbsp&nbsp<button class="w3-btn" onclick="w3_popup_close();">Non</button></div>');	
		break;
		case "rdv_conf":
			w3_popup_close();
			w3_popup("loading");
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"rdv_nouveau",
					"dt":$("#rdv_date").val(),
					"heure":$("#rdv_heure").val(),
					"demandeur":$("#rdv_demandeur").val(),
					"motif":$("#rdv_motif").val(),
					"observation":$("#rdv_observation").val(),
					"id_us":localStorage.getItem("id_us")
				},
				error:function(data)
				{
					w3_popup_close();
					w3_popup("info","Pas de connexion au serveur");
				},success:function(data)
				{
					w3_popup_close();
					if(data[0]==1)
					{
						w3_popup("info","Bien enregistré");
						$("#rdv_date").val("");
						$("#rdv_heure").val("");
						$("#rdv_demandeur").val("");
						$("#rdv_motif").val("");
						$("#rdv_observation").val("");
					}else
					{
						w3_popup("info","Echec d'enregistrement");	
					}
				}
			});
		break;
		case "user":
			$("#w3-popup-detail")
 			.html("<div class='center pt-2 bold'>Voulez-vous vraiment enregistrer ?</div><hr />"+
 					'<div class="center fs-12 pb-05"><button class="w3-btn" onclick="ajout('+"'"+"user_conf"+"'"+');">Oui</button>&nbsp&nbsp<button class="w3-btn" onclick="w3_popup_close();">Non</button></div>');	
		break;
		case "user_conf":
			w3_popup_close();
			w3_popup("loading");
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"user_nouveau",
					"nom":$("#user_nom").val(),
					"login":$("#user_login").val(),
					"mdp":$("#user_mdp").val(),
					"priv":$("#user_priv").val()
				},
				error:function(data)
				{
					w3_popup_close();
					w3_popup("info","Pas de connexion au serveur");
				},success:function(data)
				{
					w3_popup_close();
					if(data[0]==1)
					{
						w3_popup("info","Bien enregistré");
						$("#user_nom").val("");
						$("#user_login").val("");
						$("#user_mdp").val("");
						user_liste();
					}else if(data[0]==3)
					{
						w3_popup("info","Désolé, ce login existe déjà");	
					}else
					{
						w3_popup("info","Echec d'enregistrement");	
					}
				}
			});
		break;
		case "materiel":
			$("#w3-popup-detail")
 			.html("<div class='center pt-2 bold'>Voulez-vous vraiment enregistrer ?</div><hr />"+
 					'<div class="center fs-12 pb-05"><button class="w3-btn" onclick="ajout('+"'"+"materiel_conf"+"'"+');">Oui</button>&nbsp&nbsp<button class="w3-btn" onclick="w3_popup_close();">Non</button></div>');	
		break;
		case "materiel_conf":	
			$materiel=$("#materielintendance").val();
			$description=$("#descriptionintendance").val();
			$qt=$("#qtintendance").val();
			$etat=$("#etatintendance").val();
			w3_popup("loading");
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"ajout",
					"e":"materiel",
					"materiel":$materiel,
					"description":$description,
					"qt":$qt,
					"etat":$etat
				},
				error:function(data)
				{
					w3_popup_close();
					w3_popup("info","Pas de connexion au serveur");
				},
				success:function(data)
				{
					w3_popup_close();
					if(data[0]==1)
					{
						w3_popup("info","Bien enregistré");
						$("#materielintendance").val("");
						$("#descriptionintendance").val("");
						$("#qtintendance").val("");
						liste_materiel();
					}else
					{
						w3_popup("info","Echec d'enregistrement");
					}
				}
			});
		break;
	}
	$("#w3popup").fadeIn();
}
function admin_pop(e)
{
	var contenu;
	switch(e)
	{
		case "membres":
			contenu='<div class="center bold fs-15">Gestion des membres</div><hr />'+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="admin_ouvrir('+"'"+"membres_nouveau"+"'"+')">Nouveau</button>'+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="liste('+"'"+"membres"+"'"+')">Liste</button>'
		break;
		case "communiques":
			contenu='<div class="center bold fs-15">Gestion des communiqués</div><hr />'+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="admin_ouvrir('+"'"+"admin_communique"+"'"+')">Nouveau</button>'+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="liste('+"'"+"communiques"+"'"+')">Liste</button>'
		break;
		case "actualites":
			contenu="<div class='center bold fs-15'>Gestion d'actualités</div><hr />"+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="admin_ouvrir('+"'"+"admin_actualite"+"'"+')">Nouveau</button>'+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="liste('+"'"+"actualites"+"'"+')">Liste</button>'
		break;
		case "action":
			contenu="<div class='center bold fs-15'>Gestion des actions à mener</div><hr />"+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="admin_ouvrir('+"'"+"admin_action"+"'"+')">Nouveau</button>'+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="liste('+"'"+"actions"+"'"+')">Liste</button>'
		break;
		case "partenaire":
			contenu="<div class='center bold fs-15'>Gestion des partenaires</div><hr />"+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="admin_ouvrir('+"'"+"admin_partenaire"+"'"+')">Nouveau</button>'+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="liste('+"'"+"partenaires"+"'"+')">Liste</button>'
		break;
		case "finance_entree":
			contenu="<div class='center bold fs-15'>Gestion des entrées</div><hr />"+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="admin_ouvrir('+"'"+"admin_finance_entree"+"'"+')">Nouveau</button>'+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="liste('+"'"+"entrees"+"'"+')">Rapport</button>'
		break;
		case "finance_depense":
			contenu="<div class='center bold fs-15'>Gestion des depenses</div><hr />"+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="admin_ouvrir('+"'"+"admin_finance_depense"+"'"+')">Nouveau</button>'+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="liste('+"'"+"depenses"+"'"+')">Rapport</button>'
		break;
		case "departement":
			contenu="<div class='center bold fs-15'>Gestion des departements</div><hr />"+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="admin_ouvrir('+"'"+"admin_departement"+"'"+')">Enregistrer</button>'+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="liste('+"'"+"departements"+"'"+')">Mise à jour</button>'
		break;
		case "user":
			/*contenu="<div class='center bold fs-15'>Gestion des departements</div><hr />"+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="admin_ouvrir('+"'"+"user"+"'"+')">Nouveau</button>'+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large">Mise à jour</button>'*/
			activate_subpage("#user");
		break;
	}
	
	$("#w3-popup-detail")
 	.html("<div class='center fs-12 p-05'>"+contenu+"</div>"+
 		"<div class='fs-12 p-05 w3-border-top right'><button class='w3-btn' onclick='w3_popup_close();'>Annuler</span></div>"
 		);
 	
 	$("#w3popup").fadeIn();
}
function admin_ouvrir(e)
{
	w3_popup_close();
    switch(e)
    {
        case "membres_nouveau":
            activate_subpage("#membres_nouveau"); 
            break;
        case "admin_communique":
            activate_subpage("#admin_communique"); 
            break;
        case "admin_actualite":
            activate_subpage("#admin_actualite"); 
            break;
        case "admin_action":
            activate_subpage("#admin_action"); 
            break;
        case "admin_partenaire":
            activate_subpage("#admin_partenaire"); 
            break;
        case "admin_finance_entree":
            activate_subpage("#admin_finance_entree"); 
            break;
        case "admin_finance_depense":
            activate_subpage("#admin_finance_depense"); 
            break;
        case "admin_departement":
            activate_subpage("#admin_departement"); 
            break;
        case "user":
        	activate_subpage("#user"); 
        	liste_user();
        break;
         case "materiel":
        	activate_subpage("#materiels"); 
        	liste_materiel();
        break;
    }	
}
function liste_user()
{
	$.ajax({
		url:mainUrl,
		type:"GET",
		data:{"ent":"user_liste","id_exclu":0},
		success:function(data)
		{
			if(data[0]["n"]==0)
			{
				$("#user_liste").html("Aucun utilisateur");
			}else
			{
				$("#user_liste").html("");
				for(var a=0;a<data.length;a++)
				{
					var ligne="#ligne"+data[a]["id"];
					$("#user_liste")
					.append("<div class='p-05 w3-border-bottom fs-12' id='"+ligne+"'>"+
							"<div>Nom : "+data[a]["nom"]+"</div>"+
							"<div>Login : "+data[a]["login"]+"</div>"+
							"<div>Priv : "+data[a]["priv"]+"</div>"+
							"<div>Statut : "+data[a]["statut"]+"</div>"+
							"<div class='mt-02'>"+
								'<button class="w3-btn blue w3-round w3-small white-text" onclick="upd('+"'"+"user"+"'"+","+"'"+data[a]["id"]+"'"+","+"'"+data[a]["nom"]+"'"+","+"'"+data[a]["login"]+"'"+","+"'"+data[a]["priv"]+"'"+","+"'"+data[a]["priv_detail"]+"'"+","+"'"+data[a]["statut"]+"'"+')">Modifier</button>&nbsp;&nbsp'+
								'<button class="w3-btn red w3-round w3-small white-text" onclick="del('+"'"+"user"+"'"+","+"'"+""+"'"+","+"'"+data[a]["id"]+"'"+')">Supprimer</button>'+
							"</div>"+
						"</div>");
				}
			}
		}
	});
}
function liste_materiel()
{
	$.ajax({
		url:mainUrl,
		type:"GET",
		data:{"ent":"liste_materiel"},
		success:function(data)
		{
			if(data[0]["n"]==0)
			{
				$("#materiel_liste").html("Aucun materiel enregistré");
			}else
			{
				$("#materiel_liste").html("");
				for(var a=0;a<data.length;a++)
				{
					var ligne="#ligne"+data[a]["id"];
					$("#materiel_liste") 
					.append("<div class='p-05 w3-card w3-border-bottom fs-12' id='"+ligne+"'>"+
							"<div>Materiel : "+data[a]["materiel"]+"</div>"+
							"<div>Quantité : "+data[a]["qt"]+"</div>"+
							"<div>Description : "+data[a]["description"]+"</div>"+
							"<div>Etat : "+data[a]["etat"]+"</div>"+
							"<div class='mt-02'>"+
								'<button class="w3-btn red w3-round w3-small white-text" onclick="del('+"'"+"materiel"+"'"+","+"'"+""+"'"+","+"'"+data[a]["id"]+"'"+","+"'"+"Id_int"+"'"+')">Supprimer</button>'+
							"</div>"+
						"</div>");
				}
			}
		}
	});
}
function liste(e)
{
	w3_popup_close();
	activate_subpage("#template_liste");
	switch(e)
	{
		case "membres":
			$("#template_titre").html("MEMBRES");
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"liste_membres"},
				success:function(data)
				{
					if(data[0]["n"]==0)
					{
						$("#template_contenu").html("Aucun membre");
					}else
					{
						$("#template_contenu").html("");
						for(var a=0;a<data.length;a++)
						{
							var ligne="ligne"+data[a]["id"];
							$("#template_contenu")
							.append('<div class="p-05 w3-card mb-02 fs-12" id="'+ligne+'">'+
									"<div>Nom : "+data[a]["nom"]+"</div>"+
									"<div>Qualité : "+data[a]["qualite"]+"</div>"+
									"<div>Profession : "+data[a]["profession"]+"</div>"+
									"<div>Sexe : "+data[a]["sexe"]+"</div>"+
									"<div class='mt-02'>"+
										'<button class="w3-btn red w3-round w3-small white-text" onclick="del('+"'"+"membres"+"'"+","+"'"+""+"'"+","+"'"+data[a]["id"]+"'"+","+"'"+"Id_memb"+"'"+')">Supprimer</button>'+
									"</div>"+
								"</div>");
						}
					}
				}
			});
		break;
		case "communiques":
			$("#template_titre").html("COMMUNIQUES");
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"liste_communiques"},
				success:function(data)
				{
					if(data[0]["n"]==0)
					{
						$("#template_contenu").html("Aucun communiqué");
					}else
					{
						$("#template_contenu").html("");
						for(var a=0;a<data.length;a++)
						{
							var ligne="ligne"+data[a]["id"];
							$("#template_contenu")
							.append('<div class="p-05 w3-card mb-02 fs-12" id="'+ligne+'">'+
									"<div>"+data[a]["dt_diff"]+"</div>"+
									"<div>Titre : "+data[a]["titre"]+"</div>"+
									"<div>"+data[a]["detail"]+"</div>"+
									"<div class='mt-02'>"+
										'<button class="w3-btn red w3-round w3-small white-text" onclick="del('+"'"+"communiques"+"'"+","+"'"+""+"'"+","+"'"+data[a]["id"]+"'"+","+"'"+"Id_actu"+"'"+')">Supprimer</button>'+
									"</div>"+
								"</div>");
						}
					}
				}
			});
		break;
		case "actualites":
			$("#template_titre").html("ACTUALITES");
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"liste_actualites"},
				success:function(data)
				{
					if(data[0]["n"]==0)
					{
						$("#template_contenu").html("Aucune actualité");
					}else
					{
						$("#template_contenu").html("");
						for(var a=0;a<data.length;a++)
						{
							var ligne="ligne"+data[a]["id"];
							$("#template_contenu")
							.append('<div class="p-05 w3-card mb-02 fs-12" id="'+ligne+'">'+
									"<div>"+data[a]["dt_diff"]+"</div>"+
									"<div>Titre : "+data[a]["titre"]+"</div>"+
									"<div>"+data[a]["detail"]+"</div>"+
									"<div class='mt-02'>"+
										'<button class="w3-btn red w3-round w3-small white-text" onclick="del('+"'"+"actualites"+"'"+","+"'"+""+"'"+","+"'"+data[a]["id"]+"'"+","+"'"+"Id_actu"+"'"+')">Supprimer</button>'+
									"</div>"+
								"</div>");
						}
					}
				}
			});
		break;
		case "actions":
			$("#template_titre").html("ACTIONS A MENER");
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"liste_actions"},
				success:function(data)
				{
					if(data[0]["n"]==0)
					{
						$("#template_contenu").html("Aucune action enregistrée");
					}else
					{
						$("#template_contenu").html("");
						for(var a=0;a<data.length;a++)
						{
							var r=data;
							var ligne="ligne"+data[a]["id"];
							$("#template_contenu")
							.append("<div id='"+ligne+"'>"+
									"<div class='w3-bold fs-12 center bold indigo white-text p-05 w3-round'>"+r[a]["type_activite"]+" "+r[a]["periode"]+"</div>"+
									"<div class='mt-05 pb-1 fs-1 w3-border-bottom pt-1 w3-card p-05 w3-round mb-1'>"+
										'<div>Bénéficiaire : '+r[a]["beneficiaire"]+'</div>'+
										'<div>Type activité : '+r[a]["type_activite"]+'</div>'+
										'<div>Lieu : '+r[a]["lieu"]+'</div>'+
										'<div>Adresse : '+r[a]["adresse"]+'</div>'+
										'<div>Téléphone : '+r[a]["telephone"]+'</div>'+
										'<div>Nature don : '+r[a]["nature_don"]+'</div>'+
										'<div>Tél : '+r[a]["telephone"]+'</div>'+
										'<div>Observartion : '+r[a]["observation"]+'</div>'+ 
										"<div class='mt-02'>"+
											'<button class="w3-btn red w3-round w3-small white-text" onclick="del('+"'"+"actions_a_mener"+"'"+","+"'"+""+"'"+","+"'"+data[a]["id"]+"'"+","+"'"+"Id_act"+"'"+')">Supprimer</button>'+
										"</div>"+
									"</div></div>");
						}
					}
				}
			});
		break;
		case "departements":
			$("#template_titre").html("ACTIONS A MENER");
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"liste_departements"},
				success:function(data)
				{
					if(data[0]["n"]==0)
					{
						$("#template_contenu").html("Aucune action enregistrée");
					}else
					{
						$("#template_contenu").html("");
						for(var a=0;a<data.length;a++)
						{
							var r=data;
							var ligne="ligne"+data[a]["id"];
							$("#template_contenu")
							.append("<div id='"+ligne+"'>"+
									"<div class='pb-1 w3-border-bottom fs-1 w3-card w3-round p-05 mt-05'>"+
										"<div class=' fs-15 bold center'>"+r[a]["nom"]+"</div>"+ 
										'<div><i class="ion ion-person"></i> '+r[a]["responsable"]+'</div>'+
										'<div>Tél : '+r[a]["telephone"]+"  &nbsp;&nbsp;E-mail : "+r[a]["e_mail"]+'</div>'+ 
										"<div class='mt-02'>"+
											'<button class="w3-btn red w3-round w3-small white-text" onclick="del('+"'"+"departement"+"'"+","+"'"+""+"'"+","+"'"+data[a]["id"]+"'"+","+"'"+"Id_act"+"'"+')">Supprimer</button>'+
										"</div>"+
									"</div></div>");
						}
					}
				}
			});
		break;
		case "partenaires":
			$("#template_titre").html("ACTIONS A MENER");
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"liste_partenaires"},
				success:function(data)
				{
					if(data[0]["n"]==0)
					{
						$("#template_contenu").html("Aucune partenaire enregistré");
					}else
					{
						$("#template_contenu").html("");
						for(var a=0;a<data.length;a++)
						{
							var r=data;
							var ligne="ligne"+data[a]["id"];
							$("#template_contenu")
							.append("<div id='"+ligne+"'>"+
									"<div class='mt-05 pb-1 w3-border w3-border-blue pt-1 w3-card p-05 w3-round fs-1'>"+
										"<div class='w3-bold fs-15 center blue-text w3-border-bottom w3-border-blue mb-05 pb-02'>"+r[a]["nom"]+"</div>"+
										'<div>Type activité : '+r[a]["activite"]+'</div>'+
										'<div>Ville : '+r[a]["ville"]+'</div>'+
										'<div>Adresse : '+r[a]["activite"]+'</div>'+
										'<div>Site web : '+r[a]["site_web"]+'</div>'+
										'<div>Tél : '+r[a]["telephone"]+"  &nbsp;&nbsp;/  E-mail : "+r[a]["e_mail"]+'</div>'+
										'<div>Observartion : '+r[a]["observation"]+'</div>'+
										"<div class='mt-02'>"+
											'<button class="w3-btn red w3-round w3-small white-text" onclick="del('+"'"+"partenaires"+"'"+","+"'"+""+"'"+","+"'"+data[a]["id"]+"'"+","+"'"+"Id_part"+"'"+')">Supprimer</button>'+
										"</div>"+
									"</div></div>");
						}
					}
				}
			});
		break;
		case "entrees":
			$("#template_titre").html("FINANCES / ENTREES");
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"entrees_tout"},
				error:function(data){
					w3_popup_close();
					w3_popup("info","Pas de connexion au serveur");
				},
				success:function(data)
				{
					if(data["n"]==0)
					{
						$("#template_contenu").html("Aucune entrée trouvée");
					}else
					{
						$("#template_contenu").html("");
						for(var a=0;a<data["ligne"].length;a++)
						{
							var r=data["ligne"];
							var ligne="ligne"+r[a]["id"];
							$("#template_contenu")
							.append("<div id='"+ligne+"'>"+
									'<div class="w3-card w3-round-large mb-05 p-1 clearfix">'+
										'<div class="fs-1">'+r[a]["dt"]+'</div>'+
										'<div class="center">'+" "+r[a]["montant"]+" "+r[a]["monnaie"]+'</div>'+
										"<div class='mt-02'>"+
											'<button class="w3-btn red w3-round w3-small white-text" onclick="del('+"'"+"entrees"+"'"+","+"'"+""+"'"+","+"'"+r[a]["id"]+"'"+","+"'"+"Id_entr"+"'"+')">Supprimer</button>'+
										"</div>"+
									"</div></div>");
						}
					}
				}
			});
		break;
		case "depenses":
			$("#template_titre").html("FINANCES / DEPENSES");
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"depenses_tout"},
				error:function(data){
					w3_popup_close();
					w3_popup("info","Pas de connexion au serveur");
				},
				success:function(data)
				{
					if(data["n"]==0)
					{
						$("#template_contenu").html("Aucune entrée trouvée");
					}else
					{
						$("#template_contenu").html("");
						for(var a=0;a<data["ligne"].length;a++)
						{
							var r=data["ligne"];
							var ligne="ligne"+r[a]["id"];
							$("#template_contenu")
							.append("<div id='"+ligne+"'>"+
									'<div class="w3-card w3-round-large mb-05 p-1 clearfix">'+
										'<div class="fs-1">'+r[a]["dt"]+'</div>'+
										'<div class="center">'+" "+r[a]["montant"]+" "+r[a]["monnaie"]+'</div>'+
										"<div class='mt-02'>"+
											'<button class="w3-btn red w3-round w3-small white-text" onclick="del('+"'"+"depenses"+"'"+","+"'"+""+"'"+","+"'"+r[a]["id"]+"'"+","+"'"+"Id_dep"+"'"+')">Supprimer</button>'+
										"</div>"+
									"</div></div>");
						}
					}
				}
			});
		break;

	}
}
function upd(e,id,e1,e2,e3,e4,e5,e6,e7,e8)
{
	switch(e)
	{
		case "user":
			var contenu='<form onsubmit="upd_conf('+"'"+"user"+"'"+'); return false">'+
                        	'<div class="widget-container content-area vertical-col">'+
                        		'<input type="hidden" id="upd_id" value="'+id+'" />'+
                            	'<div class="text-container mb-1">'+
                                	'<div class="center p-1" style="background:#eee;border:1px solid #ccc"><strong>NOUVEL UTILISATEUR</strong></div>'+
								'</div>'+
								'<label class="item item-input widget uib_w_19 d-margins" data-uib="ionic/input" data-ver="0">'+
									'<input type="text" placeholder="Nom,post,prénom" value="'+e1+'" required id="upd_user_nom">'+
				                '</label>'+
								'<label class="item item-input widget uib_w_19 d-margins" data-uib="ionic/input" data-ver="0">'+
	                            	'<input type="text" placeholder="Login" value="'+e2+'" required id="upd_user_login">'+
	                            '</label>'+
	                            '<label class="item item-input widget uib_w_19 d-margins" data-uib="ionic/input" data-ver="0">'+
	                             	'<input type="text" placeholder="Mot de passe" value="" required id="upd_user_mdp">'+
								'</label>'+
								'<label class="item item-input item-select widget uib_w_20 d-margins" data-uib="ionic/select" data-ver="0">'+
									'<div class="input-label">Privilège</div>'+
									'<select required id="upd_user_priv">'+
										'<option value="'+e3+'">'+e4+'</option>'+
										'<option value="sec_ad">Sécretaire admin</option>'+
										'<option value="finan">finances</option>'+
										'<option value="social">Social et prgm</option>'+
										'<option value="parte">Partenaiares béfén.</option>'+
										'<option value="coord">Coordination</option>'+
										'<option value="admin">Président</option>'+
										'<option value="membre">Membres</option>'+
									'</select>'+
								'</label>'+
								'<label class="item item-input item-select widget uib_w_20 d-margins" data-uib="ionic/select" data-ver="0">'+
									'<div class="input-label">Statut</div>'+
									'<select required id="upd_user_statut">'+
										'<option value="'+e5+'">'+e5+'</option>'+
										'<option value="A">Actif</option>'+
										'<option value="B">Bloqué</option>'+
									'</select>'+
								'</label>'+


								'<p>&nbsp;</p>'+
								'<button type="submit" class="button widget uib_w_18 d-margins" data-uib="ionic/button" data-ver="0">Modifier</button>'+
								'<span class="uib_shim"></span>'+
							'</div>'+
						'</form>'

		break;
	}

	$("#w3-popup-detail")
 	.html("<div class='center fs-12 p-05'>"+contenu+"</div>"+
 		"<div class='fs-12 p-05 w3-border-top right'><button class='w3-btn' onclick='w3_popup_close();'>Annuler</span></div>"
 		);
 	
 	$("#w3popup").show();
}
function upd_conf(e)
{
	switch(e)
	{
		case "user":
			$id=$("#upd_id").val();
			$nom=$("#upd_user_nom").val();
			$login=$("#upd_user_login").val();
			$mdp=$("#upd_user_mdp").val();
			$priv=$("#upd_user_priv").val();
			$statut=$("#upd_user_statut").val();
			w3_popup_close();
			w3_popup("loading");
			$.ajax({
				url:mainUrl,
				type:"GET",
				data:{"ent":"user_upd",
					"id":$id,
					"nom":$nom,
					"login":$login,
					"mdp":$mdp,
					"priv":$priv,
					"statut":$statut
				},
				error:function(data)
				{
					w3_popup_close();
					w3_popup("info","Pas de connexion au serveur");
				},success:function(data)
				{
					w3_popup_close();
					if(data[0]==1)
					{
						w3_popup("info","Bien modifié");
						user_liste();
					}else if(data[0]==3)
					{
						w3_popup("info","Désolé, ce login existe déjà");	
					}else
					{
						w3_popup("info","Echec d'enregistrement");	
					}
				}
			});
		break;
	}
}
function del(e,_conf,id,colone)
{
	if(_conf=="")
	{
		contenu="<div class='center bold fs-15'>Voulez-vous vraiment supprimer ?</div><hr />"+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large" onclick="del('+"'"+e+"'"+","+"'"+"_conf"+"'"+","+"'"+id+"'"+","+"'"+colone+"'"+')">oui</button>'+
					'<button class="w3-btn blue w3-medium white-text m-02 w3-round-large"  onclick="w3_popup_close();">Annuler</button>';

		$("#w3-popup-detail")
	 	.html("<div class='center fs-12 p-05'>"+contenu+"</div>");

		$("#w3popup").show();
	}else
	{	
		w3_popup("loading");
		$.ajax({
			url:mainUrl,
			type:"GET",
			data:{"ent":"del","table":e,"colone":colone,"id":id},
			error:function(data)
			{
				w3_popup_close();
				w3_popup("info","Pas de connexion au serveur");
			},
			success:function(data)
			{
				w3_popup_close();
				var ligne="#ligne"+id;
				$(ligne).remove();
				w3_popup("info","Bien supprimé");
			}
		})
	}
}

