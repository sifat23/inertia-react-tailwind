<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdminActivity extends Model
{
    protected $fillable = [
        'admin_id',
        'model',
        'model_id',
        'action',
        'old_value',
        'new_value',
    ];
}
