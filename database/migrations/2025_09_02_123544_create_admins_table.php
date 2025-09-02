<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();

            $table->string('name'); // Admin full name
            $table->string('email')->unique(); // Admin email (for login)
            $table->string('password'); // Hashed password
            $table->string('phone')->nullable(); // Optional phone number
            $table->timestamp('last_login_at')->nullable(); // Last login timestamp
            $table->ipAddress('last_login_ip')->nullable(); // IP of last login

            $table->rememberToken(); // "remember me" login

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('admins');
    }
};
