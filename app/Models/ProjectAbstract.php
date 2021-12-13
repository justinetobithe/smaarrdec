<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProjectAbstract extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
}
