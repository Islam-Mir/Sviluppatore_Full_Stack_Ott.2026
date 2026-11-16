<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
class AuthController extends Controller {
 public function showLogin(){return view('auth.login');}
 public function login(Request $request){
  $credentials=$request->validate(['email'=>['required','email'],'password'=>['required','string']]);
  if(!Auth::attempt($credentials)) return back()->withErrors(['email'=>'Credenziali non valide.'])->onlyInput('email');
  $request->session()->regenerate(); // Previene session fixation
  return redirect()->intended(route('destinazioni.index'));
 }
 public function logout(Request $request){Auth::logout();$request->session()->invalidate();$request->session()->regenerateToken();return redirect()->route('login');}
}
