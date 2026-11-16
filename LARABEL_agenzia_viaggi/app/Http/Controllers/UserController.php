<?php
namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
class UserController extends Controller {
 public function index(){return view('users.index',['users'=>User::orderBy('id')->get()]);}
 public function store(Request $request){
  $data=$request->validate(['name'=>['required','string','max:255'],'email'=>['required','email','max:255','unique:users,email'],'password'=>['required','string','min:10'],'role'=>['required',Rule::in(['superadmin','admin','guest'])]]);
  User::create($data);return back()->with('success','Utente creato.');
 }
 public function update(Request $request,User $user){
  $data=$request->validate(['role'=>['required',Rule::in(['superadmin','admin','guest'])]]);
  if($user->is($request->user()) && $data['role']!=='superadmin')return back()->with('error','Non puoi toglierti il ruolo superadmin.');
  if($user->role==='superadmin' && $data['role']!=='superadmin' && User::where('role','superadmin')->count()<=1)return back()->with('error','Deve restare almeno un superadmin.');
  $user->update($data);return back()->with('success','Ruolo aggiornato.');
 }
 public function destroy(Request $request,User $user){
  if($user->is($request->user()))return back()->with('error','Non puoi eliminare il tuo account.');
  if($user->role==='superadmin' && User::where('role','superadmin')->count()<=1)return back()->with('error','Deve restare almeno un superadmin.');
  $user->delete();return back()->with('success','Utente eliminato.');
 }
}
