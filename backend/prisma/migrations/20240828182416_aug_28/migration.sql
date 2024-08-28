BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[User] (
    [id] NVARCHAR(1000) NOT NULL,
    [email] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [resetPasswordToken] NVARCHAR(1000),
    [resetPasswordTokenExpiry] DATETIME2,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [User_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    [username] NVARCHAR(1000) NOT NULL,
    [profilePhotoUrl] NVARCHAR(1000),
    [emailVerificationCode] NVARCHAR(1000),
    [newEmail] NVARCHAR(1000),
    [isEmailVerified] BIT NOT NULL CONSTRAINT [User_isEmailVerified_df] DEFAULT 0,
    CONSTRAINT [User_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [User_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[Streak] (
    [id] NVARCHAR(1000) NOT NULL,
    [userId] NVARCHAR(1000) NOT NULL,
    [name] NVARCHAR(1000) NOT NULL,
    [count] INT NOT NULL CONSTRAINT [Streak_count_df] DEFAULT 0,
    [lastReset] DATETIME2 NOT NULL CONSTRAINT [Streak_lastReset_df] DEFAULT CURRENT_TIMESTAMP,
    [lastUpdated] DATETIME2 NOT NULL CONSTRAINT [Streak_lastUpdated_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Streak_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[Streak] ADD CONSTRAINT [Streak_userId_fkey] FOREIGN KEY ([userId]) REFERENCES [dbo].[User]([id]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
