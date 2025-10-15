"use client";

import React, { useState, useEffect } from 'react';
import { Trophy, Star, Target, Zap, Medal, Gift, TrendingUp, Users, BookOpen, Award, Clock, CheckCircle, Lock, Play, ChevronRight, Heart, Flame, Shield, Crown, Sparkles, Gamepad2, BarChart3, User, Settings, Volume2, VolumeX } from 'lucide-react';

/* === Lógica intacta con mejoras visuales en clases === */
const TrainingGamificationApp = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedModule, setSelectedModule] = useState(null);
  const [userPoints, setUserPoints] = useState(1250);
  const [userLevel, setUserLevel] = useState(7);
  const [userStreak, setUserStreak] = useState(5);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [quizActive, setQuizActive] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [moduleProgress, setModuleProgress] = useState({});

  const userData = {
    name: "María González",
    position: "Mesera Senior",
    avatar: "👩‍🍳",
    level: userLevel, xp: userPoints, nextLevelXP: 1500,
    achievements: 12, rank: 3, department: "Servicio"
  };

  const trainingModules = [
    { id:1, title:"Protocolo de Servicio VIP", category:"Servicio al Cliente", duration:"3 min", points:50, difficulty:"Intermedio", icon:"⭐", color:"from-indigo-500 to-fuchsia-500", completed:true, progress:100 },
    { id:2, title:"Maridaje de Vinos y Mariscos", category:"Conocimiento de Producto", duration:"5 min", points:75, difficulty:"Avanzado", icon:"🍷", color:"from-cyan-500 to-blue-600", completed:false, progress:60 },
    { id:3, title:"Manejo de Quejas", category:"Soft Skills", duration:"4 min", points:60, difficulty:"Intermedio", icon:"💬", color:"from-amber-500 to-rose-600", completed:false, progress:30, locked:false },
    { id:4, title:"Preparación de Ceviche Especial", category:"Cocina", duration:"6 min", points:100, difficulty:"Experto", icon:"🦐", color:"from-emerald-500 to-teal-600", completed:false, progress:0, locked:true }
  ];

  const leaderboard = [
    { rank:1, name:"Carlos Rodríguez", department:"Cocina", points:2340, level:12, avatar:"👨‍🍳", trend:"up" },
    { rank:2, name:"Ana Martínez", department:"Bar", points:1890, level:9, avatar:"👩", trend:"same" },
    { rank:3, name:"María González", department:"Servicio", points:userPoints, level:userLevel, avatar:"👩‍🍳", trend:"up", isCurrentUser:true },
    { rank:4, name:"Juan Pérez", department:"Servicio", points:1180, level:6, avatar:"👨", trend:"down" },
    { rank:5, name:"Sofía López", department:"Hostess", points:980, level:5, avatar:"👩‍💼", trend:"up" }
  ];

  const rewards = [
    { id:1, name:"Día Libre Extra", cost:500, icon:"🏖️", description:"Un día libre adicional pagado", available:true, category:"Tiempo" },
    { id:2, name:"Bono de $500", cost:1000, icon:"💰", description:"Bono en efectivo", available:true, category:"Dinero" },
    { id:3, name:"Comida Gratis (1 mes)", cost:750, icon:"🍽️", description:"Comidas gratis durante el turno por 1 mes", available:true, category:"Beneficios" },
    { id:4, name:"Curso Premium", cost:1500, icon:"🎓", description:"Acceso a curso de sommelier o chef", available:false, category:"Educación" }
  ];

  const achievements = [
    { id:1, name:"Primera Victoria", description:"Completa tu primer módulo", icon:"🏆", unlocked:true, date:"2025-01-05" },
    { id:2, name:"Racha de Fuego", description:"Mantén una racha de 7 días", icon:"🔥", unlocked:false, progress:5, total:7 },
    { id:3, name:"Experto en Servicio", description:"Completa 10 módulos de servicio", icon:"⭐", unlocked:false, progress:3, total:10 },
    { id:4, name:"Velocista", description:"Completa un módulo en menos de 2 minutos", icon:"⚡", unlocked:true, date:"2025-01-08" }
  ];

  const quizQuestions = [
    { question:"¿Cuál es el tiempo máximo de espera para saludar a un cliente VIP?", options:["30 segundos","1 minuto","2 minutos","3 minutos"], correct:0 },
    { question:"¿Qué vino marida mejor con el ceviche de camarón?", options:["Tinto roble","Blanco seco","Rosado dulce","Espumoso"], correct:1 },
    { question:"¿Cuál es la temperatura ideal para servir ostiones?", options:["0-2°C","4-6°C","8-10°C","12-14°C"], correct:0 }
  ];

  useEffect(()=>{ if(showNotification){ const t=setTimeout(()=>setShowNotification(false),3000); return ()=>clearTimeout(t); } },[showNotification]);

  const showReward = (msg)=>{ setNotificationMessage(msg); setShowNotification(true); };
  const startModule = (m)=>{ if(m.locked){ showReward("🔒 Desbloquea completando más módulos"); return; } setSelectedModule(m); setCurrentView('module'); setQuizActive(false); setCurrentQuestion(0); setQuizScore(0); };
  const startQuiz = () => {
  setQuizActive(true);
  setCurrentQuestion(0);
  setQuizScore(0);
};

  const answerQuestion = (i)=>{
    if(i===quizQuestions[currentQuestion].correct){ setQuizScore(quizScore+1); showReward("✅ ¡Correcto! +10 XP"); } else { showReward("❌ Incorrecto, sigue intentando"); }
    if(currentQuestion < quizQuestions.length-1){ setTimeout(()=>setCurrentQuestion(currentQuestion+1),1000); } else { setTimeout(()=>completeModule(),1500); }
  };
  const completeModule = ()=>{
    const pointsEarned = selectedModule.points + (quizScore*10);
    setUserPoints(userPoints + pointsEarned);
    setModuleProgress({...moduleProgress, [selectedModule.id]:100});
    if(userPoints + pointsEarned >= 1500){ setUserLevel(userLevel+1); showReward(`🎉 ¡SUBISTE A NIVEL ${userLevel+1}!`); }
    showReward(`✨ ¡Módulo completado! +${pointsEarned} XP`);
    setTimeout(()=>{ setCurrentView('dashboard'); setSelectedModule(null); setQuizActive(false); },2000);
  };
  const claimReward = (r)=>{ if(userPoints>=r.cost && r.available){ setUserPoints(userPoints-r.cost); showReward(`🎁 ¡Has canjeado: ${r.name}!`); } };

  const Notification = () => (
    <div className={`fixed top-4 right-4 z-[60] transition-all transform ${showNotification ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}>
      <div className="glass px-6 py-4 flex items-center gap-3 shadow-glow ring-indigo-400/40">
        <Sparkles className="w-6 h-6 text-fuchsia-400" />
        <span className="font-bold text-slate-100">{notificationMessage}</span>
      </div>
    </div>
  );

  const DashboardView = () => (
    <div className="pb-24">
      <div className="hero">
        <div className="neo-container hero-inner">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="text-5xl drop-shadow-[0_8px_16px_rgba(0,0,0,.35)]">{userData.avatar}</div>
              <div>
                <h1 className="text-2xl">¡Hola, {userData.name}!</h1>
                <p className="hero-sub">{userData.position} • {userData.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={()=>setSoundEnabled(!soundEnabled)} className="btn-ghost rounded-lg">
                {soundEnabled ? <Volume2 /> : <VolumeX />}
              </button>
              <button className="btn-ghost rounded-lg"><Settings /></button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              {label:'Nivel', value:userData.level, icon:<Crown className="w-7 h-7 text-yellow-300" />, bar:(userData.xp / userData.nextLevelXP) * 100},
              {label:'Puntos', value:userPoints, icon:<Star className="w-7 h-7 text-yellow-300" />},
              {label:'Racha', value:`${userStreak} días`, icon:<Flame className="w-7 h-7 text-orange-300" />},
              {label:'Ranking', value:`#${userData.rank}`, icon:<Trophy className="w-7 h-7 text-yellow-300" />}
            ].map((box,idx)=>(
              <div key={idx} className="glass p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">{box.label}</p>
                    <p className="text-3xl font-extrabold">{box.value}</p>
                  </div>
                  {box.icon}
                </div>
                {box.bar!=null && (
                  <div className="mt-2 bg-white/10 rounded-full h-2">
                    <div className="bg-gradient-to-r from-yellow-300 to-pink-300 h-2 rounded-full" style={{width: `${box.bar}%`}}></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="neo-container py-6">
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-fuchsia-400" />
            Módulos de Hoy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainingModules.map((module) => (
              <div key={module.id} onClick={()=>startModule(module)} className={`relative overflow-hidden rounded-2xl shadow-card hover:shadow-glow transition-all hover:-translate-y-0.5 cursor-pointer ${module.locked?'opacity-60':''}`}>
                <div className={`bg-gradient-to-br ${module.color} p-6 text-white`}>
                  <div className="absolute top-4 right-4 text-6xl opacity-25 select-none">{module.icon}</div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="chip">{module.category}</span>
                      <div className="flex gap-2">{module.locked && <Lock className="w-5 h-5" />}{module.completed && <CheckCircle className="w-5 h-5" />}</div>
                    </div>
                    <h3 className="text-xl font-bold mb-2 drop-shadow">{module.title}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center"><Clock className="w-4 h-4 mr-1" />{module.duration}</span>
                      <span className="flex items-center"><Zap className="w-4 h-4 mr-1" />+{module.points} XP</span>
                      <span className="bg-white/30 px-2 py-1 rounded">{module.difficulty}</span>
                    </div>
                    {module.progress>0 && !module.completed && (
                      <div className="mt-4">
                        <div className="bg-white/30 rounded-full h-2"><div className="bg-white h-2 rounded-full transition-all" style={{width:`${module.progress}%`}}></div></div>
                        <p className="text-xs mt-1">{module.progress}% completado</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trophy className="w-5 h-5 text-fuchsia-400" />
            Ranking Semanal
          </h2>
          <div className="panel">
            <div className="space-y-4">
              {leaderboard.map((player)=>(
                <div key={player.rank} className={`flex items-center justify-between p-4 rounded-xl ${player.isCurrentUser?'bg-fuchsia-500/10 ring-1 ring-fuchsia-400/30':'bg-white/5'}`}>
                  <div className="flex items-center gap-4">
                    <div className={`text-2xl font-bold ${player.rank<=3?'text-yellow-400':'text-slate-400'}`}>#{player.rank}</div>
                    <div className="text-3xl">{player.avatar}</div>
                    <div>
                      <p className="font-bold text-slate-100">{player.name}</p>
                      <p className="text-sm text-slate-400">{player.department} • Nivel {player.level}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-extrabold text-slate-100">{player.points.toLocaleString()}</p>
                    <p className="text-sm text-slate-400">puntos</p>
                    {player.trend==='up' && <span className="text-emerald-400 text-sm">↑</span>}
                    {player.trend==='down' && <span className="text-rose-400 text-sm">↓</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Gift className="w-5 h-5 text-fuchsia-400" />
            Canjea tus Puntos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewards.map((r)=>(
              <div key={r.id} className={`panel text-center ${(!r.available || userPoints<r.cost)?'opacity-60':''}`}>
                <div className="text-5xl mb-3">{r.icon}</div>
                <h3 className="font-semibold">{r.name}</h3>
                <p className="text-sm text-slate-400 mb-3">{r.description}</p>
                <p className="text-2xl font-extrabold text-fuchsia-300">{r.cost} pts</p>
                <button onClick={()=>claimReward(r)} disabled={!r.available || userPoints<r.cost}
                  className={`mt-3 btn-primary rounded-lg ${(!r.available || userPoints<r.cost)?'opacity-50 cursor-not-allowed':''}`}>
                  { !r.available ? 'No disponible' : userPoints<r.cost ? 'Puntos insuficientes' : 'Canjear' }
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-fuchsia-400" />
            Tus Logros
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {achievements.map((a)=>(
              <div key={a.id} className={`panel text-center ${a.unlocked?'':'opacity-60'}`}>
                <div className="text-5xl mb-3">{a.unlocked ? a.icon : '🔒'}</div>
                <h3 className="font-semibold">{a.name}</h3>
                <p className="text-sm text-slate-400 mb-2">{a.description}</p>
                {a.unlocked ? <p className="text-xs text-emerald-400">Desbloqueado: {a.date}</p> : (
                  a.progress != null && (
                    <div>
                      <div className="bg-white/10 rounded-full h-2 mb-1">
                        <div className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 h-2 rounded-full" style={{width:`${(a.progress/a.total)*100}%`}}></div>
                      </div>
                      <p className="text-xs text-slate-400">{a.progress}/{a.total}</p>
                    </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ModuleView = () => {
    if(!selectedModule) return null;
    return (
      <div>
        <div className={`text-white p-6 bg-gradient-to-br ${selectedModule.color}`}>
          <div className="neo-container">
            <button onClick={()=>setCurrentView('dashboard')} className="mb-4 text-white/90 hover:text-white">← Volver</button>
            <div className="text-center">
              <div className="text-8xl mb-2">{selectedModule.icon}</div>
              <h1 className="text-3xl font-extrabold">{selectedModule.title}</h1>
              <p className="text-white/90">{selectedModule.category}</p>
            </div>
          </div>
        </div>
        <div className="neo-container py-6">
          {!quizActive ? (
            <div className="panel">
              <h2 className="text-xl font-semibold mb-4">Contenido del Módulo</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3"><CheckCircle className="w-6 h-6 text-emerald-400" /><div><h3 className="font-semibold">1. Identificación del Cliente VIP</h3><p className="text-slate-400">Reconoce señales que indican un cliente de alto valor.</p></div></div>
                <div className="flex items-start gap-3"><CheckCircle className="w-6 h-6 text-emerald-400" /><div><h3 className="font-semibold">2. Protocolo de Bienvenida</h3><p className="text-slate-400">Saludo personalizado en menos de 30 segundos.</p></div></div>
                <div className="flex items-start gap-3"><CheckCircle className="w-6 h-6 text-emerald-400" /><div><h3 className="font-semibold">3. Servicio Anticipado</h3><p className="text-slate-400">Adelántate a necesidades con base en preferencias.</p></div></div>
              </div>
              <div className="border-t border-white/10 pt-6">
                <h3 className="font-semibold mb-3">📹 Video Tutorial</h3>
                <div className="rounded-xl aspect-video bg-white/10 flex items-center justify-center mb-6"><Play className="w-16 h-16 text-white/60" /></div>
              </div>
              <div className="flex justify-center">
                <button onClick={startQuiz} className="btn-primary text-white px-6 py-3 rounded-xl">Comenzar Evaluación</button>
              </div>
            </div>
          ) : (
            <div className="panel">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Evaluación</h2>
                  <span className="text-slate-400">Pregunta {currentQuestion+1} de {quizQuestions.length}</span>
                </div>
                <div className="bg-white/10 rounded-full h-3">
                  <div className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 h-3 rounded-full transition-all" style={{width:`${((currentQuestion+1)/quizQuestions.length)*100}%`}}></div>
                </div>
              </div>
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">{quizQuestions[currentQuestion].question}</h3>
                <div className="space-y-3">
                  {quizQuestions[currentQuestion].options.map((option, index) => (
                    <button key={index} onClick={() => answerQuestion(index)} className="w-full p-4 text-left bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 transition-all">
                      <span className="font-medium">{option}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  const ManagerView = () => (
    <div>
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="neo-container p-6">
          <h1 className="text-3xl font-extrabold mb-2">Dashboard Gerencial</h1>
          <p className="text-white/70">Monitorea el progreso de tu equipo en tiempo real</p>
        </div>
      </div>
      <div className="neo-container py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            {icon:<Users className="w-8 h-8 text-sky-400" />, pct:"+12%", value:"47", label:"Empleados Activos"},
            {icon:<BookOpen className="w-8 h-8 text-fuchsia-400" />, pct:"+25%", value:"324", label:"Módulos Completados"},
            {icon:<TrendingUp className="w-8 h-8 text-emerald-400" />, pct:"+18%", value:"89%", label:"Tasa de Finalización"},
            {icon:<Target className="w-8 h-8 text-amber-400" />, pct:"+30%", value:"4.7/5", label:"Satisfacción Promedio"}
          ].map((k,idx)=>(
            <div key={idx} className="panel">
              <div className="flex items-center justify-between mb-2">
                {k.icon}<span className="text-emerald-400 text-sm">{k.pct}</span>
              </div>
              <p className="text-2xl font-extrabold">{k.value}</p>
              <p className="text-slate-400">{k.label}</p>
            </div>
          ))}
        </div>
        <div className="panel mb-8">
          <h2 className="font-semibold mb-4">Progreso por Departamento</h2>
          <div className="space-y-4">
            {['Cocina', 'Servicio', 'Bar', 'Administración'].map((dept, i) => {
              const progress = [85, 72, 90, 68][i];
              return (
                <div key={dept}>
                  <div className="flex justify-between mb-2"><span className="font-medium">{dept}</span><span className="text-slate-400">{progress}%</span></div>
                  <div className="bg-white/10 rounded-full h-3"><div className="bg-gradient-to-r from-indigo-400 to-fuchsia-400 h-3 rounded-full" style={{width:`${progress}%`}}></div></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="panel">
          <h2 className="font-semibold mb-4">Empleados Destacados del Mes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {leaderboard.slice(0,3).map((e)=>(
              <div key={e.rank} className="text-center p-4 bg-gradient-to-br from-indigo-900/30 to-fuchsia-900/30 rounded-xl">
                <div className="text-6xl mb-2">{e.avatar}</div>
                <h3 className="font-semibold">{e.name}</h3>
                <p className="text-slate-400">{e.department}</p>
                <div className="mt-3"><p className="text-2xl font-extrabold text-fuchsia-300">{e.points.toLocaleString()}</p><p className="text-sm text-slate-400">puntos este mes</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const BottomNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 backdrop-blur bg-black/40 border-t border-white/10">
      <div className="neo-container">
        <div className="flex justify-around py-3">
          {[
            {key:'dashboard', label:'Jugar', icon:<Gamepad2 className="w-6 h-6" />},
            {key:'leaderboard', label:'Ranking', icon:<Trophy className="w-6 h-6" />},
            {key:'rewards', label:'Premios', icon:<Gift className="w-6 h-6" />},
            {key:'profile', label:'Perfil', icon:<User className="w-6 h-6" />},
            {key:'manager', label:'Manager', icon:<BarChart3 className="w-6 h-6" />}
          ].map(tab => (
            <button key={tab.key} onClick={()=>setCurrentView(tab.key)}
              className={`flex flex-col items-center p-2 rounded-lg transition-colors ${currentView===tab.key ? 'text-fuchsia-300' : 'text-slate-400'}`}>
              {tab.icon}<span className="text-[11px] mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative">
      <Notification />
      {currentView==='dashboard' && <DashboardView />}
      {currentView==='module' && <ModuleView />}
      {currentView==='manager' && <ManagerView />}
      <BottomNavigation />
    </div>
  );
};

export default TrainingGamificationApp;
