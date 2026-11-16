<?php
use App\Http\Controllers\{AuthController,ChatbotController,ClienteController,DestinazioneController,PrenotazioneController,UserController};
use Illuminate\Support\Facades\Route;

Route::resourceParameters([
    'destinazioni' => 'destinazione',
    'clienti' => 'cliente',
    'prenotazioni' => 'prenotazione',
]);

Route::get('/',fn()=>redirect()->route('destinazioni.index'));
Route::post('/chatbot/message', [ChatbotController::class, 'sendMessage'])->name('chatbot.message');
Route::middleware('guest')->group(function(){Route::get('/login',[AuthController::class,'showLogin'])->name('login');Route::post('/login',[AuthController::class,'login'])->middleware('throttle:5,1')->name('login.submit');});
Route::middleware('auth')->group(function(){
 Route::post('/logout',[AuthController::class,'logout'])->name('logout');
 Route::middleware('role:admin,superadmin')->group(function(){
  // Registra prima le rotte statiche (create) di quelle parametriche (show).
  Route::resource('destinazioni',DestinazioneController::class)->except(['index','show']);
  Route::resource('clienti',ClienteController::class);
  Route::resource('prenotazioni',PrenotazioneController::class);
 });
 // Il guest autenticato vede solo le destinazioni. Questa resource va dopo
 // quella manager: altrimenti /destinazioni/{destinazione} intercetta /create.
 Route::resource('destinazioni',DestinazioneController::class)->only(['index','show']);
 Route::middleware('role:superadmin')->prefix('utenti')->name('users.')->group(function(){
  Route::get('/',[UserController::class,'index'])->name('index');
  Route::post('/',[UserController::class,'store'])->name('store');
  Route::patch('/{user}',[UserController::class,'update'])->name('update');
  Route::delete('/{user}',[UserController::class,'destroy'])->name('destroy');
 });
});
