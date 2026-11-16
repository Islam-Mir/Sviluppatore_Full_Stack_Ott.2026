<?php
namespace Database\Seeders;
use App\Models\User;
use Illuminate\Database\Seeder;
class DemoUsersSeeder extends Seeder {
 public function run(): void {
  foreach(['superadmin','admin','guest'] as $role){
   $password=env('DEMO_'.strtoupper($role).'_PASSWORD');
   if(!$password || strlen($password)<10)throw new \RuntimeException('Configura DEMO_'.strtoupper($role).'_PASSWORD nel .env (minimo 10 caratteri).');
   User::updateOrCreate(['email'=>$role.'@agenzia.test'],['name'=>ucfirst($role),'role'=>$role,'password'=>$password]);
  }
 }
}
