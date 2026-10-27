const tickets = [
 {id:"TK-1045",subject:"Unable to reset my password",requester:"Olivia Chen",email:"olivia.chen@northstar.io",initials:"OC",tone:"lavender",category:"Account access",priority:"High",status:"Open",assignee:"Alex Lee",assigneeInitials:"AL",assigneeTone:"lavender",updated:"4 min ago",description:"I’m not receiving the password reset email. I’ve checked spam and tried requesting a new link twice."},
 {id:"TK-1044",subject:"Invoice discrepancy for October",requester:"Marcus Reed",email:"marcus.reed@northstar.io",initials:"MR",tone:"peach",category:"Billing",priority:"Medium",status:"In progress",assignee:"Sam Carter",assigneeInitials:"SC",assigneeTone:"peach",updated:"21 min ago",description:"The October invoice appears to include an additional seat that we did not add. Could you verify the billing history?"},
 {id:"TK-1043",subject:"Dashboard takes too long to load",requester:"Priya Sharma",email:"priya.sharma@northstar.io",initials:"PS",tone:"mint",category:"Technical support",priority:"Urgent",status:"Open",assignee:"Alex Lee",assigneeInitials:"AL",assigneeTone:"lavender",updated:"38 min ago",description:"The analytics dashboard is taking more than 30 seconds to load for our team. This is blocking our daily reporting."},
 {id:"TK-1042",subject:"Request to update team members",requester:"Noah Williams",email:"noah.williams@northstar.io",initials:"NW",tone:"blue",category:"Account access",priority:"Low",status:"Resolved",assignee:"Riley Park",assigneeInitials:"RP",assigneeTone:"mint",updated:"1 hr ago",description:"Please remove two former team members from our workspace and invite our new designer."},
 {id:"TK-1041",subject:"Export to CSV is failing",requester:"Emma Wilson",email:"emma.wilson@northstar.io",initials:"EW",tone:"rose",category:"Technical support",priority:"High",status:"In progress",assignee:"Sam Carter",assigneeInitials:"SC",assigneeTone:"peach",updated:"1 hr ago",description:"CSV exports fail with a timeout error whenever I select a date range longer than one month."},
 {id:"TK-1040",subject:"Feature request: custom email alerts",requester:"Ethan Brooks",email:"ethan.brooks@northstar.io",initials:"EB",tone:"blue",category:"Product feedback",priority:"Low",status:"Open",assignee:"Jordan Miller",assigneeInitials:"JM",assigneeTone:"blue",updated:"2 hrs ago",description:"It would be helpful to receive email alerts for a custom set of events instead of all activity."},
 {id:"TK-1039",subject:"Two-factor authentication issue",requester:"Isabella Moore",email:"isabella.moore@northstar.io",initials:"IM",tone:"lavender",category:"Account access",priority:"Urgent",status:"Open",assignee:"Alex Lee",assigneeInitials:"AL",assigneeTone:"lavender",updated:"2 hrs ago",description:"My authenticator code is consistently rejected even though the device time is synchronized."},
 {id:"TK-1038",subject:"Unable to add a payment method",requester:"Liam Foster",email:"liam.foster@northstar.io",initials:"LF",tone:"mint",category:"Billing",priority:"Medium",status:"Resolved",assignee:"Riley Park",assigneeInitials:"RP",assigneeTone:"mint",updated:"3 hrs ago",description:"I couldn’t add our new corporate card. The issue was resolved after refreshing the billing profile."},
 {id:"TK-1037",subject:"Mobile app crashes on launch",requester:"Ava Thompson",email:"ava.thompson@northstar.io",initials:"AT",tone:"peach",category:"Technical support",priority:"High",status:"Open",assignee:"Jordan Miller",assigneeInitials:"JM",assigneeTone:"blue",updated:"4 hrs ago",description:"The mobile application closes immediately after launch on the latest version of Android."},
 {id:"TK-1036",subject:"How to invite a guest user?",requester:"Mason Clark",email:"mason.clark@northstar.io",initials:"MC",tone:"blue",category:"General inquiry",priority:"Low",status:"Resolved",assignee:"Riley Park",assigneeInitials:"RP",assigneeTone:"mint",updated:"Yesterday",description:"I’d like to invite an external collaborator with limited access to a single project."},
 {id:"TK-1035",subject:"Workspace branding not updating",requester:"Sophia Turner",email:"sophia.turner@northstar.io",initials:"ST",tone:"rose",category:"Technical support",priority:"Medium",status:"In progress",assignee:"Sam Carter",assigneeInitials:"SC",assigneeTone:"peach",updated:"Yesterday",description:"The workspace logo still shows the old image after saving our new branding settings."},
 {id:"TK-1034",subject:"Cancel my subscription renewal",requester:"James Baker",email:"james.baker@northstar.io",initials:"JB",tone:"lavender",category:"Billing",priority:"Medium",status:"Open",assignee:"Jordan Miller",assigneeInitials:"JM",assigneeTone:"blue",updated:"Yesterday",description:"Please confirm the steps required to stop the subscription from renewing next month."}
];
const events = [
 {person:"Riley Park",initials:"RP",tone:"mint",verb:"resolved",ticket:"TK-1038",summary:"Unable to add a payment method",time:"2 minutes ago",day:"TODAY"},
 {person:"Sam Carter",initials:"SC",tone:"peach",verb:"replied to",ticket:"TK-1041",summary:"Export to CSV is failing",time:"18 minutes ago",day:"TODAY"},
 {person:"Alex Lee",initials:"AL",tone:"lavender",verb:"was assigned to",ticket:"TK-1043",summary:"Dashboard takes too long to load",time:"42 minutes ago",day:"TODAY"},
 {person:"Jordan Miller",initials:"JM",tone:"blue",verb:"created",ticket:"TK-1045",summary:"Unable to reset my password",time:"1 hour ago",day:"TODAY"},
 {person:"Riley Park",initials:"RP",tone:"mint",verb:"replied to",ticket:"TK-1042",summary:"Request to update team members",time:"Yesterday at 4:42 PM",day:"YESTERDAY"},
 {person:"Sam Carter",initials:"SC",tone:"peach",verb:"changed priority on",ticket:"TK-1039",summary:"Two-factor authentication issue",time:"Yesterday at 3:15 PM",day:"YESTERDAY"}
];
const byId = id => document.getElementById(id);
const shortCount = value => String(value).padStart(2,"0");
const state = {view:"overview", search:"", status:"", priority:"", page:1, showAll:false};
const toneClass = tone => ({lavender:"avatar-lavender",peach:"avatar-peach",mint:"avatar-mint",blue:"avatar-blue",rose:"avatar-rose"})[tone] || "avatar-blue";
const symbolTone = category => category==="Billing"?"orange":category==="Technical support"?"blue":category==="Product feedback"?"green":category==="General inquiry"?"rose":"";
const symbolFor = category => category==="Billing"?"＄":category==="Technical support"?"⌘":category==="Product feedback"?"✦":category==="General inquiry"?"✉":"♙";
function statusClass(status){return status==="In progress"?"status-in-progress":status==="Resolved"?"status-resolved":status==="Waiting"?"status-waiting":"status-open"}
function priorityClass(priority){return priority.toLowerCase()}
function avatar(initials,tone){return '<span class="avatar '+toneClass(tone)+'">'+escapeHtml(initials)+'</span>'}
function escapeHtml(value){return String(value).replace(/[&<>"']/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]))}
function requester(ticket){return '<div class="requester-cell">'+avatar(ticket.initials,ticket.tone)+'<span class="requester-name"><strong>'+escapeHtml(ticket.requester)+'</strong><small>'+escapeHtml(ticket.email.split("@")[0])+'</small></span></div>'}
function subjectCell(ticket){return '<div class="ticket-link"><span class="ticket-symbol '+symbolTone(ticket.category)+'">'+symbolFor(ticket.category)+'</span><span class="ticket-title"><strong>'+escapeHtml(ticket.subject)+'</strong><small>'+ticket.id+'</small></span></div>'}
function assigneeCell(ticket){return '<span class="assignee-cell">'+avatar(ticket.assigneeInitials,ticket.assigneeTone)+escapeHtml(ticket.assignee)+'</span>'}
function priorityCell(ticket){return '<span class="priority '+priorityClass(ticket.priority)+'"><i></i>'+escapeHtml(ticket.priority)+'</span>'}
function statusCell(ticket){return '<span class="status-pill '+statusClass(ticket.status)+'">'+escapeHtml(ticket.status)+'</span>'}
function matches(ticket,query){return !query||[ticket.id,ticket.subject,ticket.requester,ticket.email,ticket.category,ticket.assignee].some(value=>value.toLowerCase().includes(query.toLowerCase()))}
function renderOverview(){
 const visible=tickets.filter(t=>matches(t,state.search));
 const paginated=state.showAll?visible:visible.slice(0,5);
 byId("ticket-table-body").innerHTML=paginated.length?paginated.map(t=>'<tr><td><input type="checkbox" class="ticket-checkbox" aria-label="Select '+t.id+'"></td><td><a href="#" class="ticket-open" data-ticket="'+t.id+'">'+subjectCell(t)+'</a></td><td>'+requester(t)+'</td><td>'+priorityCell(t)+'</td><td>'+statusCell(t)+'</td><td>'+assigneeCell(t)+'</td><td><button class="row-more" data-ticket="'+t.id+'" aria-label="Ticket actions">•••</button></td></tr>').join(""):'<tr><td colspan="7"><div class="empty-state">No tickets match your search.</div></td></tr>';
 byId("table-count").textContent='Showing '+paginated.length+' of '+visible.length+' tickets';
 byId("metric-open").textContent=shortCount(tickets.filter(t=>t.status==="Open").length);
 byId("metric-progress").textContent=shortCount(tickets.filter(t=>t.status==="In progress").length);
 byId("nav-open-count").textContent=tickets.filter(t=>t.status==="Open").length;
 byId("page-two").classList.toggle("page-active",state.showAll);
 byId("page-two").setAttribute("aria-label",state.showAll?"Show first page":"Show all tickets");
}
function renderAllTickets(){
 const query=byId("all-search")?.value||"";
 const status=byId("status-select")?.value||"";
 const priority=byId("priority-select")?.value||"";
 const visible=tickets.filter(t=>matches(t,query)&&(!status||t.status===status)&&(!priority||t.priority===priority));
 byId("all-ticket-body").innerHTML=visible.length?visible.map(t=>'<tr><td><a href="#" class="ticket-id-link" data-ticket="'+t.id+'">'+t.id+'</a></td><td><a href="#" class="ticket-open" data-ticket="'+t.id+'">'+subjectCell(t)+'</a></td><td>'+requester(t)+'</td><td>'+escapeHtml(t.category)+'</td><td>'+priorityCell(t)+'</td><td><button class="inline-status" data-ticket="'+t.id+'" title="Click to cycle ticket status">'+statusCell(t)+'</button></td><td>'+assigneeCell(t)+'</td><td>'+escapeHtml(t.updated)+'</td></tr>').join(""):'<tr><td colspan="8"><div class="empty-state">No tickets found. Try clearing your filters.</div></td></tr>';
 byId("all-table-count").textContent=visible.length+' ticket'+(visible.length===1?"":"s");
 byId("list-total").textContent=tickets.length;
 byId("list-open").textContent=tickets.filter(t=>t.status==="Open").length;
 byId("list-high").textContent=tickets.filter(t=>t.priority==="High"||t.priority==="Urgent").length;
 byId("filter-indicator").classList.toggle("visible",Boolean(status||priority));
}
function renderMine(){
 const mine=tickets.filter(t=>t.assignee==="Jordan Miller");
 byId("mine-count").textContent=mine.length+' tickets';
 byId("mine-ticket-body").innerHTML=mine.map(t=>'<tr><td><a href="#" class="ticket-id-link" data-ticket="'+t.id+'">'+t.id+'</a></td><td><a href="#" class="ticket-open" data-ticket="'+t.id+'">'+subjectCell(t)+'</a></td><td>'+requester(t)+'</td><td>'+priorityCell(t)+'</td><td><button class="inline-status" data-ticket="'+t.id+'">'+statusCell(t)+'</button></td><td>'+escapeHtml(t.updated)+'</td></tr>').join("")||'<tr><td colspan="6"><div class="empty-state">Nothing assigned to you right now.</div></td></tr>';
}
function renderActivity(){
 const groups={TODAY:events.filter(e=>e.day==="TODAY"),YESTERDAY:events.filter(e=>e.day==="YESTERDAY")};
 byId("activity-feed").innerHTML=Object.entries(groups).map(([day,items])=>'<div class="feed-day">'+day+'</div>'+items.map(e=>'<div class="feed-event">'+avatar(e.initials,e.tone)+'<div class="feed-copy"><strong>'+escapeHtml(e.person)+'</strong> '+escapeHtml(e.verb)+' <a href="#" data-ticket="'+e.ticket+'">'+e.ticket+'</a><br>'+escapeHtml(e.summary)+'<small>'+escapeHtml(e.time)+'</small></div><span class="feed-time">'+(day==="TODAY"?"Today":"Yesterday")+'</span></div>').join("")).join("");
}
function renderAll(){renderOverview();renderAllTickets();renderMine();renderActivity()}
function navigate(view){
 state.view=view;
 document.querySelectorAll(".page-content[id^='view-']").forEach(el=>el.classList.toggle("hidden",el.id!=="view-"+view));
 document.querySelectorAll(".nav-item").forEach(el=>el.classList.toggle("active",el.dataset.view===view));
 const title=({"overview":"Overview","tickets":"All tickets","my-tickets":"Assigned to me","activity":"Activity"})[view]||"Overview";
 byId("breadcrumb-current").textContent=title;
 byId("sidebar").classList.remove("open");
 window.scrollTo({top:0,behavior:"smooth"});
}
function toast(title,detail=""){const item=document.createElement("div");item.className="toast";item.innerHTML='<span class="toast-mark">✓</span><span>'+escapeHtml(title)+(detail?'<small>'+escapeHtml(detail)+'</small>':'')+'</span>';byId("toast-region").appendChild(item);setTimeout(()=>{item.style.opacity="0";item.style.transform="translateY(5px)";setTimeout(()=>item.remove(),200)},3400)}
function openCreateModal(){byId("ticket-form").reset();byId("ticket-modal").showModal()}
function openDetails(id){
 const ticket=tickets.find(t=>t.id===id);if(!ticket)return;
 byId("detail-content").innerHTML='<div class="detail-top"><div class="detail-topline"><span class="detail-id">'+ticket.id+'</span><button class="modal-close" id="detail-close" aria-label="Close">×</button></div><h2>'+escapeHtml(ticket.subject)+'</h2><p class="detail-subtitle">Created by '+escapeHtml(ticket.requester)+' · '+escapeHtml(ticket.email)+'</p><div style="display:flex;gap:8px;margin-top:15px">'+statusCell(ticket)+priorityCell(ticket)+'</div></div><div class="detail-body"><h3 style="font:700 11px Manrope;margin:0 0 10px">Description</h3><p class="detail-description">'+escapeHtml(ticket.description)+'</p><div class="detail-meta"><div><small>REQUESTER</small><strong>'+escapeHtml(ticket.requester)+'</strong></div><div><small>CATEGORY</small><strong>'+escapeHtml(ticket.category)+'</strong></div><div><small>ASSIGNEE</small><strong>'+escapeHtml(ticket.assignee)+'</strong></div><div><small>LAST UPDATED</small><strong>'+escapeHtml(ticket.updated)+'</strong></div></div><div class="detail-actions"><button class="secondary-button" id="cycle-status" data-ticket="'+ticket.id+'">Change status</button><button class="primary-button" id="assign-me" data-ticket="'+ticket.id+'">Assign to me <span>→</span></button></div></div>';
 byId("detail-modal").showModal();
}
function cycleStatus(id){
 const ticket=tickets.find(t=>t.id===id);if(!ticket)return;
 const order=["Open","In progress","Resolved"];ticket.status=order[(order.indexOf(ticket.status)+1)%order.length];ticket.updated="Just now";
 events.unshift({person:"Jordan Miller",initials:"JM",tone:"blue",verb:"updated status on",ticket:id,summary:ticket.subject,time:"Just now",day:"TODAY"});
 renderAll();toast("Ticket status updated",id+" is now "+ticket.status);
 if(byId("detail-modal").open)openDetails(id);
}
document.querySelectorAll("[data-view]").forEach(button=>button.addEventListener("click",()=>navigate(button.dataset.view)));
document.querySelectorAll("[data-filter]").forEach(button=>button.addEventListener("click",()=>{navigate("tickets");byId("status-select").value=button.dataset.filter;renderAllTickets()}));
document.querySelectorAll("[data-go]").forEach(button=>button.addEventListener("click",()=>navigate(button.dataset.go)));
["create-ticket","create-ticket-list","create-ticket-mine"].forEach(id=>byId(id).addEventListener("click",openCreateModal));
byId("close-modal").addEventListener("click",()=>byId("ticket-modal").close());
byId("cancel-modal").addEventListener("click",()=>byId("ticket-modal").close());
byId("ticket-form").addEventListener("submit",event=>{
 event.preventDefault();const data=new FormData(event.currentTarget);
 const nextNumber=Math.max(...tickets.map(t=>Number(t.id.slice(3))))+1;const id="TK-"+nextNumber;
 const requesterName=String(data.get("requester")).trim();const initials=requesterName.split(/\s+/).slice(0,2).map(part=>part[0]).join("").toUpperCase();
 const email=String(data.get("email")||"").trim();
 const ticket={id,subject:String(data.get("subject")).trim(),requester:requesterName,email:email||"no-email-provided",initials,tone:"lavender",category:String(data.get("category")),priority:String(data.get("priority")),status:"Open",assignee:"Jordan Miller",assigneeInitials:"JM",assigneeTone:"blue",updated:"Just now",description:String(data.get("description")).trim()};
 tickets.unshift(ticket);events.unshift({person:"Jordan Miller",initials:"JM",tone:"blue",verb:"created",ticket:id,summary:ticket.subject,time:"Just now",day:"TODAY"});
 byId("ticket-modal").close();renderAll();navigate("tickets");byId("all-search").value=id;renderAllTickets();toast("Ticket created",id+" has been added to your queue.");
});
byId("ticket-search").addEventListener("input",event=>{state.search=event.target.value;state.showAll=false;renderOverview()});
byId("all-search").addEventListener("input",renderAllTickets);
byId("status-select").addEventListener("change",renderAllTickets);
byId("priority-select").addEventListener("change",renderAllTickets);
byId("clear-filters").addEventListener("click",()=>{byId("all-search").value="";byId("status-select").value="";byId("priority-select").value="";renderAllTickets()});
byId("filter-button").addEventListener("click",()=>{navigate("tickets");byId("status-select").focus();toast("Ticket filters","Choose a status or priority from the filters.")});
byId("select-all").addEventListener("change",event=>document.querySelectorAll(".ticket-checkbox").forEach(box=>box.checked=event.target.checked));
byId("page-two").addEventListener("click",()=>{state.showAll=!state.showAll;renderOverview()});
byId("next-page").addEventListener("click",()=>{state.showAll=true;renderOverview()});
byId("mobile-menu").addEventListener("click",()=>byId("sidebar").classList.toggle("open"));
byId("notifications-button").addEventListener("click",()=>toast("You're all caught up","No new notifications."));
byId("help-button").addEventListener("click",()=>toast("Help center","The support documentation will be available here."));
byId("team-button").addEventListener("click",()=>toast("Team overview","Workload data shown here is sample data."));
byId("add-view").addEventListener("click",()=>toast("Saved views","Custom views can be configured in a future version."));
byId("profile-button").addEventListener("click",()=>toast("Jordan Miller","Support admin · Demo profile"));
document.addEventListener("click",event=>{
 const ticketTrigger=event.target.closest("[data-ticket]");
 if(!ticketTrigger)return;
 event.preventDefault();
 if(ticketTrigger.id==="cycle-status"){cycleStatus(ticketTrigger.dataset.ticket);return}
 if(ticketTrigger.id==="assign-me"){
   const t=tickets.find(x=>x.id===ticketTrigger.dataset.ticket);
   if(t){t.assignee="Jordan Miller";t.assigneeInitials="JM";t.assigneeTone="blue";renderAll();openDetails(t.id);toast("Ticket assigned",t.id+" is now assigned to you.")}
   return;
 }
 openDetails(ticketTrigger.dataset.ticket);
});
document.addEventListener("click",event=>{if(event.target.id==="detail-close")byId("detail-modal").close()});
byId("detail-modal").addEventListener("click",event=>{if(event.target===byId("detail-modal"))byId("detail-modal").close()});
byId("ticket-modal").addEventListener("click",event=>{if(event.target===byId("ticket-modal"))byId("ticket-modal").close()});
renderAll();