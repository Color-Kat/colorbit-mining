<?php

namespace App\Models;

use App\traits\HasRole;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    // From JetStream
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;

    // MyTraits
    use HasRole;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',

        // TODO скрытые поля, чтобы не забыть
        'role_id',
        'email_verified_at',
        'two_factor_confirmed_at',
        'updated_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Define relationship for user's havings.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function havings()
    {
        return $this
            ->hasMany(Having::class)
            ->orderBy('id', 'DESC');
    }

    /**
     * Define relationship for user's rigs.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function rigs() {
        return $this
            ->hasMany(Rig::class)
            ->orderBy('id', 'DESC');
    }

    /**
     * Override trait to change color.
     * Get the default profile photo URL if no profile photo has been uploaded.
     *
     * @return string
     */
    protected function defaultProfilePhotoUrl()
    {
        $name = trim(collect(explode(' ', $this->name))->map(function ($segment) {
            return mb_substr($segment, 0, 1);
        })->join(' '));

        return 'https://ui-avatars.com/api/?name='.urlencode($name).'&color=121212&background=D1D5DB';
    }
}
